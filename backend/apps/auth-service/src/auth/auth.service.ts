import { firstValueFrom } from 'rxjs';
import { ExpiresInType } from '../type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { LoginRequestDto, LoginResonseDto, PatternOption, RegisterRequestDto, Service, UserEntity } from '@app/shared';

@Injectable()
export class AuthService {
  constructor(
      @Inject(Service.USER)
      private readonly userClient: ClientKafka,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
    ) {}

  
  async validate(token: string) : Promise<UserEntity> {
    try {
      var verify = this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET')
      });
    } catch (err) {
      throw new ForbiddenException("Token expried !!!");
    }
      
    return await firstValueFrom(
      this.userClient.send<UserEntity>(PatternOption['USER.GET_BY_ID'], verify.sub)
    );
    
  }

  async login(dto: LoginRequestDto): Promise<LoginResonseDto> {
    const user = await firstValueFrom(
      this.userClient.send<UserEntity>(PatternOption['USER.GET_BY_EMAIL_AND_PASSWORD'], dto)
    );
    
    const payload: JwtPayload = {sub: user.id, email: user.email};
    return { 
      accessToken: await this.generateToken('accessToken', payload, '30m'), 
      refreshToken: await this.generateToken('refreshToken', payload, '7d'), 
    };
  }

  async register(dto: RegisterRequestDto): Promise<UserEntity> {
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

  private async generateToken(type: keyof LoginResonseDto, payload: JwtPayload, expiresIn: ExpiresInType) {
    const secretKey = 
      type === 'accessToken' ? 
      "ACCESS_TOKEN_SECRET" : 
      "REFRESH_TOKEN_SECRET";

    return await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret: this.configService.get(secretKey),
    })
  }

}
