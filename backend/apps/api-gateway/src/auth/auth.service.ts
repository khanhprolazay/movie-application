import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { first, firstValueFrom } from "rxjs";
import { LoginGoogleRequestDto, LoginRequestDto, LoginResonseDto, PatternOption, RefreshTokenDto, RegisterRequestDto, Service, UserEntity } from "@app/shared";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Service.AUTH) 
    private readonly authClient: ClientKafka
  ) {}

  async validate(token: string) {
    return await firstValueFrom(
      this.authClient.send<UserEntity>(PatternOption["AUTH.VALIDATE"], token)
    );
  }

  async login(dto: LoginRequestDto) {
    return await firstValueFrom(
      this.authClient.send<LoginResonseDto>(PatternOption["AUTH.LOGIN"], dto)
    );
  }

  async googleLogin(dto: LoginGoogleRequestDto) {
    return await firstValueFrom(
      this.authClient.send<LoginResonseDto>(PatternOption["AUTH.GOOGLE_LOGIN"], dto)
    );
  }

  async register(dto: RegisterRequestDto) {
    return await firstValueFrom(
      this.authClient.send<UserEntity>(PatternOption["AUTH.REGISTER"], dto)
    );
  }

  async refreshToken(dto: RefreshTokenDto) {
    return await firstValueFrom(
      this.authClient.send<string>(PatternOption["AUTH.REFRESH_TOKEN"], dto)
    );
  }
}