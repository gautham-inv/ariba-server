import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { auth } from '../better-auth';

export const ActiveOrgId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.session.activeOrganizationId) {
      throw new UnauthorizedException('No active organization selected');
    }

    return session.session.activeOrganizationId;
  },
);
