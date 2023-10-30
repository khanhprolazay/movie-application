import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, OnModuleInit, Post } from "@nestjs/common";
import { LoginGoogleRequestDto, LoginRequestDto, Pattern, RefreshTokenDto, RegisterRequestDto, Service} from "@app/shared";
import { AuthService } from "./auth.service";
import { ClientKafka } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags("Auth")
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(Service.AUTH) 
    private readonly authClient: ClientKafka,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterRequestDto) {
    return this.authService.register(dto);
  }

  @Post('google')
  loginGoogle(@Body() dto: LoginGoogleRequestDto) {
    return this.authService.googleLogin(dto);
  }

  @Post('refreshToken')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  async onModuleInit() {
    const patterns: Pattern[] = ["AUTH.LOGIN", "AUTH.REGISTER", "AUTH.VALIDATE",  "AUTH.REFRESH_TOKEN", "AUTH.GOOGLE_LOGIN"];
    patterns.forEach(pattern => this.authClient.subscribeToResponseOf(pattern));
    await this.authClient.connect();
  }
}