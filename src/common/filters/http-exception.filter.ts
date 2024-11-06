import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorDetails = this.getErrorDetails(exception);

        const errorResponse: ApiResponse<null> = {
            success: false,
            error: errorDetails.message,
            message: this.getErrorContext(request, errorDetails),
        };

        this.logError(request, errorDetails, exception);
        response.status(status).json(errorResponse);
    }

    private getErrorDetails(exception: any): {
        message: string;
        code: string;
        status: number;
    } {
        let message: string;
        let status: number;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();

            if (typeof response === 'object') {
                message = (response as any).message || exception.message;
            } else {
                message = response;
            }
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = exception.message || 'Internal server error';
        }

        return {
            message,
            status,
            code: this.getErrorCode(status),
        };
    }

    private getErrorCode(status: number): string {
        switch (status) {
            case HttpStatus.UNAUTHORIZED:
                return 'UNAUTHORIZED';
            case HttpStatus.FORBIDDEN:
                return 'FORBIDDEN';
            case HttpStatus.NOT_FOUND:
                return 'NOT_FOUND';
            case HttpStatus.BAD_REQUEST:
                return 'BAD_REQUEST';
            case HttpStatus.INTERNAL_SERVER_ERROR:
                return 'INTERNAL_SERVER_ERROR';
            default:
                return 'UNKNOWN_ERROR';
        }
    }

    private getErrorContext(
        request: Request,
        errorDetails: { message: string; code: string },
    ): string {
        return `[${errorDetails.code}] Error occurred while accessing ${request.method} ${request.url}`;
    }

    private logError(
        request: Request,
        errorDetails: { message: string; code: string },
        exception: any,
    ): void {
        const logContext = {
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorCode: errorDetails.code,
            message: errorDetails.message,
            body: request.body,
            params: request.params,
            query: request.query,
        };

        if (process.env.NODE_ENV !== 'production') {
            logContext['stack'] = exception.stack;
        }

        this.logger.error(
            `[${request.method}] ${request.url} - ${errorDetails.message}`,
            JSON.stringify(logContext, null, 2),
        );
    }
}
