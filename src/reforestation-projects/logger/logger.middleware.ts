import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log('Middleware', req.method, req.originalUrl, Object.keys(req.query).length > 0 ? req.query : "No query params")

    next();
  }
}
