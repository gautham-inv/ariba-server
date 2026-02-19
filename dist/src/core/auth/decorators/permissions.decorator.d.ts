import { statement } from '../permissions';
type Resource = keyof typeof statement;
type Action<R extends Resource> = (typeof statement)[R] extends readonly (infer A)[] ? A : never;
export type PermissionRequirement = {
    [R in Resource]?: Action<R>[];
};
export declare const PERMISSIONS_KEY = "permissions";
export declare const RequirePermissions: (requirements: PermissionRequirement) => import("@nestjs/common").CustomDecorator<string>;
export {};
