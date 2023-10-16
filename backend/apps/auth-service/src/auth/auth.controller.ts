import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientKafka, Payload, MessagePattern } from '@nestjs/microservices';
import { LoginRequestDto, Pattern, RegisterRequestDto, Service, PatternOption, LoginGoogleRequestDto } from '@app/shared';

@Controller()
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(Service.USER)
    private readonly userClient: ClientKafka,
    private readonly authService: AuthService
  ) {}


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
    return this.authService.googleLogin(dto);
  }

  async onModuleInit() {
    const patterns: Pattern[] = ['USER.CREATE', 'USER.GET_BY_ID', 'USER.GET_BY_EMAIL', 'USER.CREATE_GOOGLE', 'USER.CHECK_BY_EMAIL', 'USER.GET_BY_EMAIL_AND_PASSWORD'];
    patterns.forEach( pattern => this.userClient.subscribeToResponseOf(pattern))
    await this.userClient.connect();
  }
}
