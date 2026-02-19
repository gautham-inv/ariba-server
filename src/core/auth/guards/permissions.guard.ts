import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSIONS_KEY,
  PermissionRequirement,
} from '../decorators/permissions.decorator';
import { auth } from '../better-auth';
import { AuthenticatedRequest } from '../interfaces/auth-request.interface';
import { AuthorizeResponse } from 'better-auth/plugins/access';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirement = this.reflector.getAllAndOverride<PermissionRequirement>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requirement) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const sessionDetail = request.session;
    const user = request.user;

    if (!sessionDetail || !user) {
      throw new ForbiddenException('No active session found');
    }

    // Check permission using better-auth API but with cached session if possible
    // Note: better-auth 'hasPermission' might still need to check DB for roles
    // but at least we don't fetch the session again.
    try {
      const result = await (auth.api.hasPermission({
        headers: request.headers as any,
        body: {
          permissions: requirement as any,
        },
      }) as Promise<AuthorizeResponse>);

      if (!result.success) {
        // Since AuthorizeResponse only has error: string on success: false
        const errorMessage = (result as any).error || 'You do not have the required permissions for this action';

        console.warn(`[PermissionsGuard] Access Denied for ${request.url}:`, {
          requirement,
          error: errorMessage,
        });

        throw new ForbiddenException(errorMessage);
      }

      return true;
    } catch (e) {
      if (e instanceof ForbiddenException) throw e;
      console.error('[PermissionsGuard] Internal Security Error:', e);
      throw new ForbiddenException('Security check failed');
    }
  }
}
