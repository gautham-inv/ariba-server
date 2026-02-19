import { Request } from 'express';
import { User, Session } from 'better-auth';

/**
 * Extended Request interface to include user and session objects
 * attached by the AuthMiddleware.
 */
export interface AuthenticatedRequest extends Request {
  user?: User;
  session?: Session & { activeOrganizationId?: string };
}
