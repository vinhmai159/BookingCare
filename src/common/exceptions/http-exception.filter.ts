import {Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger, HttpStatus} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // const status = exception.getStatus();
        const status =
        exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorException = {
            statusCode: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message:  (exception instanceof Error) ? exception.message : null,
        };

        Logger.error(
            `${request.method} ${request.url}`,
            JSON.stringify(errorException),
            'ExceptionFillter',
        );

        response.status(status).json(errorException);
    }
}
