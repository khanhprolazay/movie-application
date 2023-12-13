import { Observable, catchError, first, timeout } from "rxjs";
import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";

@Injectable()
export class ServiceSerializer implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
    .handle()
    .pipe(
      first(),
      timeout(100000), 
      catchError(error => {
        throw error.response ? new HttpException(error.response, error.response.statusCode) : new InternalServerErrorException(error, "Internal Server Error");
      }),
    );
  }
}