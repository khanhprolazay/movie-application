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

  validate(token: string) {
    return this.authClient.send<User>(PatternOption["AUTH.VALIDATE"], token);
  }

  login(dto: LoginRequestDto) {
    return this.authClient.send<LoginResonseDto>(PatternOption["AUTH.LOGIN"], dto);
  }

  sso(dto: LoginGoogleRequestDto) {
    return this.authClient.send<LoginResonseDto>(PatternOption["AUTH.GOOGLE_LOGIN"], dto);
  }

  register(dto: RegisterRequestDto) {
    return this.authClient.send<User>(PatternOption["AUTH.REGISTER"], dto);
  }

  refreshToken(dto: RefreshTokenDto) {
    return this.authClient.send<string>(PatternOption["AUTH.REFRESH_TOKEN"], dto);
  }
}