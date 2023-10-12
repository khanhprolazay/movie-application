import { Observable, catchError } from "rxjs";
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";

@Injectable()
export class HttpExceptionSerializer implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(error => {
      throw error.response ? new HttpException(error.response, error.response.statusCode) : error;
    }))
  }
}