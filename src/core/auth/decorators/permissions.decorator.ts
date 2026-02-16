import { SetMetadata } from '@nestjs/common';
import { statement } from '../permissions';

type Resource = keyof typeof statement;
// @ts-ignore
type Action<R extends Resource> = (typeof statement)[R][number];

export type PermissionRequirement = {
  [R in Resource]?: Action<R>[];
};

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (requirements: PermissionRequirement) =>
  SetMetadata(PERMISSIONS_KEY, requirements);
