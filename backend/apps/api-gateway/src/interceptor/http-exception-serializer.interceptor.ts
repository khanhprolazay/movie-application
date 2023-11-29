import { Observable, catchError, finalize, timeout } from "rxjs";
import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";

@Injectable()
export class HttpExceptionSerializer implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle()
    .pipe(
      timeout(10000), 
      catchError(error => {
        throw error.response ? new HttpException(error.response, error.response.statusCode) : new InternalServerErrorException(error, "Internal Server Error");
      }),
      catchError(error => {
        throw new InternalServerErrorException(error, "Internal Server Error"); 
      }),
    );
  }
}