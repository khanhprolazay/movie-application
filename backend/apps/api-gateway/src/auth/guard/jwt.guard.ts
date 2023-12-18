import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { AuthService } from '../auth.service';
import { firstValueFrom } from "rxjs";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ) {}

  /**
   * We are already had a HttpExceptionSerializor as a Nestjs interceptor
   * to filter error throw by microservices.
   * 
   * But, Nestjs guards are executed before interceptors
   * So, The error thrown by Guard are not catch by Interceptor
   * We will use try catch locally 
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      // Get bearer token from Request
      const bearerToken = request.headers.authorization;
      if (!bearerToken) return false;

      // Get token then validate
      const token = bearerToken.split(' ')[1];
      const user = await firstValueFrom(this.authService.validate(token)); // the error will be thrown here

      // Attach user to request
      request.user = user;
      return true;

    } catch (error) {
      // This error are thrown by authService 
      // Which is connect to auth microservice
      throw error.response ? new HttpException(error.response, error.response.statusCode) : error;
    }

  }
}