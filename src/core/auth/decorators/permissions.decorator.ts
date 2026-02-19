import { SetMetadata } from '@nestjs/common';
import { statement } from '../permissions';

type Resource = keyof typeof statement;
type Action<R extends Resource> = (typeof statement)[R] extends readonly (infer A)[]
  ? A
  : never;

export type PermissionRequirement = {
  [R in Resource]?: Action<R>[];
};

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (requirements: PermissionRequirement) =>
  SetMetadata(PERMISSIONS_KEY, requirements);
