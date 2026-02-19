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
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let PurchaseOrderService = class PurchaseOrderService {
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async createPO(data) {
        const quote = await this.prisma.quote.findUnique({
            where: { id: data.quoteId },
            include: { supplier: true },
        });
        if (!quote) {
            throw new common_1.NotFoundException('Quote not found');
        }
        if (quote.status !== 'CONFIRMED') {
            throw new common_1.BadRequestException(`Cannot create PO from quote with status ${quote.status}. Quote must be CONFIRMED.`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const po = await tx.purchaseOrder.create({
                data: {
                    buyerOrgId: data.buyerOrgId,
                    supplierId: quote.supplierId,
                    quoteId: quote.id,
                    rfqId: quote.rfqId,
                    totalAmount: quote.totalAmount,
                    status: 'DRAFT',
                    notes: data.notes,
                },
            });
            const applicableRules = await tx.approvalRule.findMany({
                where: {
                    buyerOrgId: data.buyerOrgId,
                    minAmount: { lte: quote.totalAmount },
                },
            });
            let finalStatus = 'APPROVED';
            if (applicableRules.length > 0) {
                finalStatus = 'PENDING_APPROVAL';
                await tx.approvalRequest.create({
                    data: {
                        buyerOrgId: data.buyerOrgId,
                        entityId: po.id,
                        entityType: 'PURCHASE_ORDER',
                        status: 'PENDING',
                    },
                });
            }
            const finalPO = await tx.purchaseOrder.update({
                where: { id: po.id },
                data: { status: finalStatus },
            });
            await tx.quote.update({
                where: { id: quote.id },
                data: { status: 'ACCEPTED' },
            });
            await tx.rFQ.update({
                where: { id: quote.rfqId },
                data: { status: 'CLOSED' },
            });
            return finalPO;
        });
        if (result.status === 'PENDING_APPROVAL') {
            await this.notificationService.notifyRole(data.buyerOrgId, 'approver', 'New PO Pending Approval', `A new Purchase Order for ${quote.supplier.name} (${quote.totalAmount}) requires your authorization.`, 'info');
        }
        return result;
    }
    async getPOsByOrg(orgId) {
        return this.prisma.purchaseOrder.findMany({
            where: { buyerOrgId: orgId },
            include: {
                supplier: true,
                quote: {
                    select: {
                        id: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPOById(id) {
        return this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                supplier: true,
                buyerOrg: true,
                quote: {
                    include: {
                        rfq: {
                            include: {
                                items: true,
                            },
                        },
                    },
                },
                files: true,
            },
        });
    }
    async deletePO(id) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        return this.prisma.$transaction(async (tx) => {
            await tx.approvalRequest.deleteMany({
                where: { entityId: id, entityType: 'PURCHASE_ORDER' },
            });
            return tx.purchaseOrder.delete({
                where: { id },
            });
        });
    }
    async sendPO(id) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                supplier: true,
                buyerOrg: true,
                quote: {
                    include: {
                        rfq: {
                            include: { items: true },
                        },
                    },
                },
            },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        if (po.status !== 'APPROVED') {
            throw new common_1.BadRequestException('Only approved POs can be sent to suppliers');
        }
        const updatedPO = await this.prisma.purchaseOrder.update({
            where: { id },
            data: { status: 'SENT' },
        });
        console.log(`[PO SENT] Email would be sent to ${po.supplier.email} for PO ${po.id}`);
        return updatedPO;
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], PurchaseOrderService);
//# sourceMappingURL=purchase-order.service.js.map