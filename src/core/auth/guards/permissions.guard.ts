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

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requirement = this.reflector.getAllAndOverride<PermissionRequirement>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requirement) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Check permission using better-auth API
    try {
      const result = await auth.api.hasPermission({
        headers: request.headers,
        body: {
          permissions: requirement as any,
        },
      });

      if (!result.success) {
        const error = (result as any).error;
        console.warn(`[PermissionsGuard] Access Denied for ${request.url}:`, {
          requirement,
          error: error?.message || 'Unknown Error',
          code: error?.code,
        });

        const message =
          error?.message ||
          'You do not have the required permissions for this action';
        throw new ForbiddenException(message);
      }

      return true;
    } catch (e) {
      if (e instanceof ForbiddenException) throw e;
      console.error('[PermissionsGuard] Internal Security Error:', e);
      throw new ForbiddenException('Security check failed');
    }
  }
}
