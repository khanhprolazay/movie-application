import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { LoginGoogleRequestDto, LoginRequestDto, LoginResonseDto, PatternOption, RefreshTokenDto, RegisterRequestDto, Service, User } from "@app/shared";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Service.AUTH) 
    private readonly authClient: ClientProxy
  ) {}

  async validate(token: string) {
    return await firstValueFrom(
      this.authClient.send<User>(PatternOption["AUTH.VALIDATE"], token)
    );
  }

  async login(dto: LoginRequestDto) {
    return await firstValueFrom(
      this.authClient.send<LoginResonseDto>(PatternOption["AUTH.LOGIN"], dto)
    );
  }

  async sso(dto: LoginGoogleRequestDto) {
    return await firstValueFrom(
      this.authClient.send<LoginResonseDto>(PatternOption["AUTH.GOOGLE_LOGIN"], dto)
    );
  }

  async register(dto: RegisterRequestDto) {
    return await firstValueFrom(
      this.authClient.send<User>(PatternOption["AUTH.REGISTER"], dto)
    );
  }

  async refreshToken(dto: RefreshTokenDto) {
    return await firstValueFrom(
      this.authClient.send<string>(PatternOption["AUTH.REFRESH_TOKEN"], dto)
    );
  }
}