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
exports.ApprovalController = void 0;
const common_1 = require("@nestjs/common");
const approval_service_1 = require("./approval.service");
const permissions_guard_1 = require("../../core/auth/guards/permissions.guard");
const permissions_decorator_1 = require("../../core/auth/decorators/permissions.decorator");
const active_org_decorator_1 = require("../../core/auth/decorators/active-org.decorator");
const current_user_decorator_1 = require("../../core/auth/decorators/current-user.decorator");
const create_rule_dto_1 = require("./dto/create-rule.dto");
let ApprovalController = class ApprovalController {
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
    async createRule(orgId, body) {
        return this.approvalService.createRule({
            ...body,
            buyerOrgId: orgId,
        });
    }
    async getRules(orgId) {
        return this.approvalService.getRules(orgId);
    }
    async getPendingRequests(orgId) {
        return this.approvalService.getPendingRequests(orgId);
    }
    async approveRequest(id, userId) {
        return this.approvalService.approveRequest(id, userId);
    }
    async rejectRequest(id, userId) {
        return this.approvalService.rejectRequest(id, userId);
    }
};
exports.ApprovalController = ApprovalController;
__decorate([
    (0, common_1.Post)('rules'),
    (0, permissions_decorator_1.RequirePermissions)({ rule: ['manage'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rule_dto_1.CreateRuleDto]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "createRule", null);
__decorate([
    (0, common_1.Get)('rules/:orgId'),
    (0, permissions_decorator_1.RequirePermissions)({ rule: ['read'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "getRules", null);
__decorate([
    (0, common_1.Get)('pending/:orgId'),
    (0, permissions_decorator_1.RequirePermissions)({ approval: ['read'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, permissions_decorator_1.RequirePermissions)({ approval: ['approve'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "approveRequest", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, permissions_decorator_1.RequirePermissions)({ approval: ['approve'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ApprovalController.prototype, "rejectRequest", null);
exports.ApprovalController = ApprovalController = __decorate([
    (0, common_1.Controller)('approvals'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalController);
//# sourceMappingURL=approval.controller.js.map