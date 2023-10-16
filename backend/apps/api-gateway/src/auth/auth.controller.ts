import { Body, Controller, HttpCode, HttpException, HttpStatus, Inject, OnModuleInit, Post } from "@nestjs/common";
import { LoginGoogleRequestDto, LoginRequestDto, Pattern, RegisterRequestDto, Service} from "@app/shared";
import { AuthService } from "./auth.service";
import { ClientKafka } from "@nestjs/microservices";

@Controller('auth')
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

  async onModuleInit() {
    const patterns: Pattern[] = ["AUTH.LOGIN", "AUTH.REGISTER", "AUTH.VALIDATE", "AUTH.GOOGLE_LOGIN"];
    patterns.forEach(pattern => this.authClient.subscribeToResponseOf(pattern));
    await this.authClient.connect();
  }
}