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
exports.PurchaseOrderController = void 0;
const common_1 = require("@nestjs/common");
const purchase_order_service_1 = require("./purchase-order.service");
const permissions_guard_1 = require("../../core/auth/guards/permissions.guard");
const permissions_decorator_1 = require("../../core/auth/decorators/permissions.decorator");
const active_org_decorator_1 = require("../../core/auth/decorators/active-org.decorator");
const create_po_dto_1 = require("./dto/create-po.dto");
let PurchaseOrderController = class PurchaseOrderController {
    constructor(poService) {
        this.poService = poService;
    }
    async createPO(orgId, body) {
        return this.poService.createPO({
            ...body,
            buyerOrgId: orgId,
        });
    }
    async getPOsByOrg(orgId) {
        return this.poService.getPOsByOrg(orgId);
    }
    async getPOById(id) {
        return this.poService.getPOById(id);
    }
    async deletePO(id) {
        return this.poService.deletePO(id);
    }
    async sendPO(id) {
        return this.poService.sendPO(id);
    }
};
exports.PurchaseOrderController = PurchaseOrderController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)({ purchaseOrder: ['create'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_po_dto_1.CreatePODto]),
    __metadata("design:returntype", Promise)
], PurchaseOrderController.prototype, "createPO", null);
__decorate([
    (0, common_1.Get)('org/:orgId'),
    (0, permissions_decorator_1.RequirePermissions)({ purchaseOrder: ['read'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseOrderController.prototype, "getPOsByOrg", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)({ purchaseOrder: ['read'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseOrderController.prototype, "getPOById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)({ purchaseOrder: ['delete'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseOrderController.prototype, "deletePO", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    (0, permissions_decorator_1.RequirePermissions)({ purchaseOrder: ['send'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PurchaseOrderController.prototype, "sendPO", null);
exports.PurchaseOrderController = PurchaseOrderController = __decorate([
    (0, common_1.Controller)('purchase-orders'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [purchase_order_service_1.PurchaseOrderService])
], PurchaseOrderController);
//# sourceMappingURL=purchase-order.controller.js.map