"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const better_auth_1 = require("../better-auth");
let PermissionsGuard = class PermissionsGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requirement = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requirement) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const sessionDetail = request.session;
        const user = request.user;
        if (!sessionDetail || !user) {
            throw new common_1.ForbiddenException('No active session found');
        }
        try {
            const result = await better_auth_1.auth.api.hasPermission({
                headers: request.headers,
                body: {
                    permissions: requirement,
                },
            });
            if (!result.success) {
                const errorMessage = result.error || 'You do not have the required permissions for this action';
                console.warn(`[PermissionsGuard] Access Denied for ${request.url}:`, {
                    requirement,
                    error: errorMessage,
                });
                throw new common_1.ForbiddenException(errorMessage);
            }
            return true;
        }
        catch (e) {
            if (e instanceof common_1.ForbiddenException)
                throw e;
            console.error('[PermissionsGuard] Internal Security Error:', e);
            throw new common_1.ForbiddenException('Security check failed');
        }
    }
};
exports.PermissionsGuard = PermissionsGuard;
exports.PermissionsGuard = PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionsGuard);
//# sourceMappingURL=permissions.guard.js.map