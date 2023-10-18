import { firstValueFrom } from 'rxjs';
import { ExpiresInType } from '../type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface';
import { ConfigService } from '@nestjs/config';
import goolgeUtils from '../utils/googleUtils';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable, ConflictException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { LoginGoogleRequestDto, LoginRequestDto, LoginResonseDto, PatternOption, RefreshTokenDto, RegisterGoogleRequestDto, RegisterRequestDto, Service, UserEntity } from '@app/shared';

@Injectable()
export class AuthService {
  constructor(
      @Inject(Service.USER)
      private readonly userClient: ClientKafka,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
    ) {}

  
  async validate(token: string) {
    try {
      const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
      const verify = this.jwtService.verify<JwtPayload>(token, {secret});

      return await firstValueFrom(
        this.userClient.send<UserEntity>(PatternOption['USER.GET_BY_ID'], verify.sub)
      );
    } catch (err) {
      throw new ForbiddenException("Token expried !!!");
    }
  }

  async login(dto: LoginRequestDto): Promise<LoginResonseDto> {
    const user = await firstValueFrom(
      this.userClient.send<UserEntity>(PatternOption['USER.GET_BY_EMAIL_AND_PASSWORD'], dto)
    );
    
    const payload: JwtPayload = {sub: user.id, email: user.email};
    return { 
      accessToken: this.generateToken('accessToken', payload, '30m'), 
      refreshToken: this.generateToken('refreshToken', payload, '7d'), 
    };
  }

  async googleLogin(dto: LoginGoogleRequestDto) : Promise<LoginResonseDto> {
    try {
      const googleToken = dto.accessToken;
      const response = await goolgeUtils.getUserProfile(googleToken);
      
      const check = await firstValueFrom(
        this.userClient.send<string>(PatternOption['USER.CHECK_BY_EMAIL'], response.email)
      );

      let user: UserEntity;

      if (check === "false") {
        const googleDto: RegisterGoogleRequestDto = {
          email: response.email,
          avatar: response.picture,
          lastName: response.given_name,
          firstName: response.family_name,
        };
        user = await firstValueFrom(this.userClient.send<UserEntity>(PatternOption['USER.CREATE_GOOGLE'], googleDto));
      } else {
        user = await firstValueFrom(this.userClient.send<UserEntity>(PatternOption['USER.GET_BY_EMAIL'], response.email));
      }
      
      const payload: JwtPayload = {sub: user.id, email: user.email};
      return { 
        accessToken: this.generateToken('accessToken', payload, '30m'), 
        refreshToken: this.generateToken('refreshToken', payload, '7d'), 
      };
      
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async register(dto: RegisterRequestDto) {
    if (dto.password !== dto.rePassword) {
      throw new ConflictException('Two provided password is not the same !!!');
    }

    const check = await firstValueFrom(
      this.userClient.send<string>(PatternOption['USER.CHECK_BY_EMAIL'], dto.email)
    );

    if (check === 'true') {
      throw new ConflictException('Gmail is already in use !!!');
    }

    return await firstValueFrom(
      this.userClient.send<UserEntity>(PatternOption['USER.CREATE'], dto)
    )
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
      const verify = this.jwtService.verify<JwtPayload>(dto.refreshToken, {secret});
      const payload: JwtPayload = { sub: verify.sub, email: verify.email };
      const accessToken = this.generateToken('accessToken', payload, '30m');
      return { accessToken };
    } catch (err) {
      throw new ForbiddenException("Token expried !!!");
    }
    
  }

  private generateToken(type: keyof LoginResonseDto, payload: JwtPayload, expiresIn: ExpiresInType | number) {
    const secretKey = 
      type === 'accessToken' ? 
      "ACCESS_TOKEN_SECRET" : 
      "REFRESH_TOKEN_SECRET";

    return this.jwtService.sign(payload, {
      expiresIn: expiresIn,
      secret: this.configService.get(secretKey),    
    })
  }

}

