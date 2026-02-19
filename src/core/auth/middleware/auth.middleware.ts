import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { auth } from '../better-auth';
import { AuthenticatedRequest } from '../interfaces/auth-request.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authReq = req as AuthenticatedRequest;
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (session) {
        authReq.user = session.user;
        authReq.session = session.session;
      }
    } catch (error) {
      console.error('[AuthMiddleware] Session fetch error:', error);
    }

    next();
  }
}
