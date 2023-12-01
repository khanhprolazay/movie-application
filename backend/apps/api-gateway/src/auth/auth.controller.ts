import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginGoogleRequestDto, LoginRequestDto, RefreshTokenDto, RegisterRequestDto, Service} from "@app/shared";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

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

  @Post('google/callback')
  sso(@Body() dto: LoginGoogleRequestDto) {
    return this.authService.sso(dto);
  }

  @Post('refreshToken')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}