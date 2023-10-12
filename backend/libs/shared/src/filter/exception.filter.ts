import { BaseRpcExceptionFilter } from "@nestjs/microservices";
import { ArgumentsHost, Catch } from "@nestjs/common";
import { throwError } from "rxjs";
import { LoggerService } from "../module";

interface Exception {
  response: {
    statusCode: number
    message: string,
    error: string,
  }
}

@Catch()
export class ExceptionFilter extends BaseRpcExceptionFilter<Exception> {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  catch(exception: any, host: ArgumentsHost)
  {
    console.log(exception);
    const {message, error, statusCode } = exception.response;
    this.loggerService.error(`${statusCode} ${error}`, message, `Microservice Exception Filter`);
    return throwError(() => exception);
  }
  
}