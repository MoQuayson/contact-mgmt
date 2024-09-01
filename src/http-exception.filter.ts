import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    //const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //console.log('exception: ', exception);
    if (exception.cause == null) {
      response.status(status).json({
        code: status,
        message: exception.message,
      });
      return;
    }
    response.status(status).json({
      code: status,
      message: exception.message,
      errors: JSON.parse(exception.cause.toString()),
    });
  }
}
