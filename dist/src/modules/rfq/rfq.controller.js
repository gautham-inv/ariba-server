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
exports.RFQController = void 0;
const common_1 = require("@nestjs/common");
const rfq_service_1 = require("./rfq.service");
const permissions_guard_1 = require("../../core/auth/guards/permissions.guard");
const permissions_decorator_1 = require("../../core/auth/decorators/permissions.decorator");
const active_org_decorator_1 = require("../../core/auth/decorators/active-org.decorator");
const create_rfq_dto_1 = require("./dto/create-rfq.dto");
const create_quote_dto_1 = require("./dto/create-quote.dto");
const update_quote_status_dto_1 = require("./dto/update-quote-status.dto");
let RFQController = class RFQController {
    constructor(rfqService) {
        this.rfqService = rfqService;
    }
    async createRFQ(orgId, body) {
        return this.rfqService.createRFQ({
            ...body,
            buyerOrgId: orgId,
        });
    }
    async sendRFQ(id) {
        return this.rfqService.sendRFQ(id);
    }
    async getRFQs(orgId) {
        return this.rfqService.getRFQs(orgId);
    }
    async getRFQ(id) {
        return this.rfqService.getRFQ(id);
    }
    async createQuote(id, body) {
        return this.rfqService.createQuote({
            rfqId: id,
            ...body,
        });
    }
    async updateQuoteStatus(id, body) {
        return this.rfqService.updateQuoteStatus(id, body.status);
    }
    async deleteRFQ(id) {
        return this.rfqService.deleteRFQ(id);
    }
};
exports.RFQController = RFQController;
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.RequirePermissions)({ rfq: ['create'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_rfq_dto_1.CreateRFQDto]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "createRFQ", null);
__decorate([
    (0, common_1.Post)(':id/send'),
    (0, permissions_decorator_1.RequirePermissions)({ rfq: ['send'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "sendRFQ", null);
__decorate([
    (0, common_1.Get)('org/:orgId'),
    (0, permissions_decorator_1.RequirePermissions)({ rfq: ['read'] }),
    __param(0, (0, active_org_decorator_1.ActiveOrgId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "getRFQs", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permissions_decorator_1.RequirePermissions)({ rfq: ['read'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "getRFQ", null);
__decorate([
    (0, common_1.Post)(':id/quote'),
    (0, permissions_decorator_1.RequirePermissions)({ quote: ['record'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_quote_dto_1.CreateQuoteDto]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "createQuote", null);
__decorate([
    (0, common_1.Post)('quote/:id/status'),
    (0, permissions_decorator_1.RequirePermissions)({ quote: ['confirm'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_quote_status_dto_1.UpdateQuoteStatusDto]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "updateQuoteStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.RequirePermissions)({ rfq: ['delete'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RFQController.prototype, "deleteRFQ", null);
exports.RFQController = RFQController = __decorate([
    (0, common_1.Controller)('rfq'),
    (0, common_1.UseGuards)(permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [rfq_service_1.RFQService])
], RFQController);
//# sourceMappingURL=rfq.controller.js.map