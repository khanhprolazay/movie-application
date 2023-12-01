import { firstValueFrom } from 'rxjs';
import { ExpiresInType } from '../type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface';
import { jwtDecode } from 'jwt-decode';
import { ConfigService } from '@nestjs/config';
import goolgeUtils from '../utils/googleUtils';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, ConflictException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GoogleProfile, LoginGoogleRequestDto, LoginRequestDto, LoginResonseDto, PatternOption, RefreshTokenDto, RegisterGoogleRequestDto, RegisterRequestDto, Service, User, UserLoginType } from '@app/shared';

@Injectable()
export class AuthService {
  constructor(
      @Inject(Service.USER)
      private readonly userClient: ClientProxy,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
    ) {}

  
  async validate(token: string) {
    try {
      const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
      const verify = this.jwtService.verify<JwtPayload>(token, {secret});

      return await firstValueFrom(
        this.userClient.send<User>(PatternOption['USER.GET.BY_ID'], verify.sub)
      );
    } catch (err) {
      throw new ForbiddenException("Token expried !!!");
    }
  }

  async login(dto: LoginRequestDto): Promise<LoginResonseDto> {
    const user = await firstValueFrom(
      this.userClient.send<User>(PatternOption['USER.GET.BY_EMAIL_AND_PASSWORD'], dto)
    );
    
    const payload: JwtPayload = {sub: user.id, email: user.email};
    return { 
      accessToken: this.generateToken('accessToken', payload, '30m'), 
      refreshToken: this.generateToken('refreshToken', payload, '7d'), 
    };
  }

  async sso(dto: LoginGoogleRequestDto) : Promise<LoginResonseDto> {
    try {
      const googleToken = dto.accessToken;
      const credential = dto.credential;

      const profile = googleToken ? await goolgeUtils.getUserProfile(googleToken) : jwtDecode<GoogleProfile>(credential);
      
      const check = await firstValueFrom(
        this.userClient.send<string>(PatternOption['USER.CHECK.BY_EMAIL'], profile.email)
      );

      let user: User;

      if (!check || check === "false") {
        const googleDto: RegisterGoogleRequestDto = {
          email: profile.email,
          avatar: profile.picture,
          lastName: profile.given_name,
          loginType: UserLoginType.GOOGLE,
          firstName: profile.family_name,
        };
        user = await firstValueFrom(this.userClient.send<User>(PatternOption['USER.CREATE.BY_GOOGLE'], googleDto));
      } else {
        user = await firstValueFrom(this.userClient.send<User>(PatternOption['USER.GET.BY_EMAIL'], profile.email));
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
      this.userClient.send<string>(PatternOption['USER.CHECK.BY_EMAIL'], dto.email)
    );

    if (check === 'true') {
      throw new ConflictException('Gmail is already in use !!!');
    }

    return await firstValueFrom(
      this.userClient.send<User>(PatternOption['USER.CREATE'], dto)
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

