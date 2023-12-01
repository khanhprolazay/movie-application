import { Controller, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { LoginRequestDto, RegisterRequestDto, Service, PatternOption, LoginGoogleRequestDto, RefreshTokenDto } from '@app/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @MessagePattern(PatternOption['AUTH.LOGIN'])
  login(@Payload() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @MessagePattern(PatternOption['AUTH.REGISTER'])
  register(@Payload() dto: RegisterRequestDto) {
    return this.authService.register(dto);
  }

  @MessagePattern(PatternOption['AUTH.VALIDATE'])
  validate(@Payload() token: string) {
    return this.authService.validate(token);
  }

  @MessagePattern(PatternOption['AUTH.GOOGLE_LOGIN'])
  googleLogin(@Payload() dto: LoginGoogleRequestDto) {
    return this.authService.sso(dto);
  }

  @MessagePattern(PatternOption['AUTH.REFRESH_TOKEN'])
  refreshToken(@Payload() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}
