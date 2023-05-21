import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const userAgent = request.get('user-agent') || '';
    const startedAt = performance.now();
    this.logger.log(
      JSON.stringify({
        type: 'REQUEST',
        method: request.method,
        path: request.originalUrl,
        userAgent,
        ip: request.ip,
      }),
    );
    response.on('finish', () => {
      this.logger.log(
        JSON.stringify({
          type: 'RESPONSE',
          method: request.method,
          path: request.originalUrl,
          statusCode: response.statusCode,
          executionTime: `${Math.round(performance.now() - startedAt)}ms`,
          contentLength: response.get('content-length') || 'chunked',
          userAgent,
          ip: request.ip,
        }),
      );
    });
    next();
  }
}
