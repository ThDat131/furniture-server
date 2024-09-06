import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';
import { isArray } from 'class-validator';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseObject = exception.getResponse() as any;
        const errorArray = responseObject?.message;
        console.log(errorArray);
        let errorText = undefined;

        if (isArray(errorArray)) {
            errorText = errorArray.join(';');
        }

        const errorResponse: ApiResponse<null> = {
            success: false,
            error: errorText ?? exception.message,
        };

        console.log(exception);

        console.log(exception.getResponse());

        response.status(status).json(errorResponse);
    }
}
