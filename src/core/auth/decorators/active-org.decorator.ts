import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from '../better-auth';
import { AuthenticatedRequest } from '../interfaces/auth-request.interface';

export const ActiveOrgId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const session = request.session;

    if (!session || !session.activeOrganizationId) {
      throw new UnauthorizedException('No active organization selected');
    }

    return session.activeOrganizationId;
  },
);
