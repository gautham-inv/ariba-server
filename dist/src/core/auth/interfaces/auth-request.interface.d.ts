import { Request } from 'express';
import { User, Session } from 'better-auth';
export interface AuthenticatedRequest extends Request {
    user?: User;
    session?: Session & {
        activeOrganizationId?: string;
    };
}
