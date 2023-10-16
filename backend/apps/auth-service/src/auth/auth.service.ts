import { first, firstValueFrom } from 'rxjs';
import { ExpiresInType } from '../type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable, ConflictException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { LoggerService, LoginGoogleRequestDto, LoginRequestDto, LoginResonseDto, PatternOption, RegisterGoogleRequestDto, RegisterRequestDto, Service, UserEntity } from '@app/shared';
import axios from 'axios';

interface GoogleResponse  {
  id: string,
  email: string,
  given_name: string,
  family_name: string,
  picture: string
}

async function getGooleUserProfile(accessToken: string) {
  return axios.get<GoogleResponse>("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
    headers: {
      Authorization: "Bearer " + accessToken 
    }})
    .then(response => response.data)
    .catch(error => { throw(error)}) 
}

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

  async googleLogin(dto: LoginGoogleRequestDto) : Promise<LoginResonseDto> {
    try {
      const googleToken = dto.accessToken;
      const response = await getGooleUserProfile(googleToken);
      
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
        accessToken: await this.generateToken('accessToken', payload, '30m'), 
        refreshToken: await this.generateToken('refreshToken', payload, '7d'), 
      };
      
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
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

