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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../../core/email/email.service");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const current_user_decorator_1 = require("../../core/auth/decorators/current-user.decorator");
const active_org_decorator_1 = require("../../core/auth/decorators/active-org.decorator");
const permissions_guard_1 = require("../../core/auth/guards/permissions.guard");
const permissions_decorator_1 = require("../../core/auth/decorators/permissions.decorator");
let OrganizationController = class OrganizationController {
    constructor(emailService, prisma) {
        this.emailService = emailService;
        this.prisma = prisma;
    }
    async getNotifications(userId) {
        if (!userId) {
            return [];
        }
        const notifications = await this.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        return notifications;
    }
    async markNotificationsRead(userId) {
        if (!userId)
            return { success: false };
        await this.prisma.notification.updateMany({
            where: { userId, read: false },
            data: { read: true },
        });
        return { success: true };
    }
    async getMembers(orgId) {
        const members = await this.prisma.member.findMany({
            where: { organizationId: orgId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        return members;
    }
    async verifyInvitation(id) {
        const invitation = await this.prisma.invitation.findUnique({
            where: { id },
            include: { organization: true },
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation not found');
        }
        const user = await this.prisma.user.findUnique({
            where: { email: invitation.email },
        });
        return {
            id: invitation.id,
            email: invitation.email,
            role: invitation.role,
            organizationName: invitation.organization.name,
            orgId: invitation.organizationId,
            existingUser: !!user,
        };
    }
    async deleteMember(id) {
        return this.prisma.member.delete({
            where: { id },
        });
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('notifications'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Post)('notifications/read-all'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "markNotificationsRead", null);
__decorate([
    (0, common_1.Get)('members'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)({ member: ['read'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getMembers", null);
__decorate([
    (0, common_1.Get)('verify-invitation/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "verifyInvitation", null);
__decorate([
    (0, common_1.Delete)('member/:id'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    (0, permissions_decorator_1.RequirePermissions)({ member: ['delete'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteMember", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        prisma_service_1.PrismaService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map