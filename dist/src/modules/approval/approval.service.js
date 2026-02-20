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
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
const email_service_1 = require("../../core/email/email.service");
let ApprovalService = class ApprovalService {
    constructor(prisma, notificationService, emailService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }
    async createRule(data) {
        return this.prisma.approvalRule.create({
            data: {
                buyerOrgId: data.buyerOrgId,
                minAmount: data.minAmount,
                currency: data.currency,
                role: data.role,
            },
        });
    }
    async getRules(orgId) {
        return this.prisma.approvalRule.findMany({
            where: { buyerOrgId: orgId },
        });
    }
    async evaluatePORules(poId, totalAmount, orgId, currency = 'USD') {
        const applicableRules = await this.prisma.approvalRule.findMany({
            where: {
                buyerOrgId: orgId,
                currency,
                minAmount: { lte: totalAmount },
            },
        });
        if (applicableRules.length === 0) {
            return { required: false };
        }
        await this.prisma.approvalRequest.create({
            data: {
                buyerOrgId: orgId,
                entityId: poId,
                entityType: 'PURCHASE_ORDER',
                status: 'PENDING',
            },
        });
        await this.notificationService.notifyRole(orgId, 'approver', 'New Approval Required', `A new Purchase Order (${poId.substring(0, 8)}) requires your review.`, 'info');
        return { required: true };
    }
    async getPendingRequests(orgId) {
        const requests = await this.prisma.approvalRequest.findMany({
            where: {
                buyerOrgId: orgId,
                status: 'PENDING',
            },
            orderBy: { createdAt: 'desc' },
        });
        const detailedRequests = await Promise.all(requests.map(async (req) => {
            if (req.entityType === 'PURCHASE_ORDER') {
                const po = await this.prisma.purchaseOrder.findUnique({
                    where: { id: req.entityId },
                    include: { supplier: true },
                });
                return { ...req, purchaseOrder: po };
            }
            return req;
        }));
        return detailedRequests;
    }
    async approveRequest(requestId, userId) {
        const request = await this.prisma.approvalRequest.findUnique({
            where: { id: requestId },
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (request.status !== 'PENDING')
            throw new common_1.BadRequestException('Request already processed');
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedRequest = await tx.approvalRequest.update({
                where: { id: requestId },
                data: {
                    status: 'APPROVED',
                    approvedById: userId,
                },
            });
            if (request.entityType === 'PURCHASE_ORDER') {
                const po = await tx.purchaseOrder.update({
                    where: { id: request.entityId },
                    data: { status: 'APPROVED' },
                    include: {
                        supplier: true,
                        buyerOrg: true,
                    },
                });
                await this.emailService.sendPurchaseOrder({
                    supplierEmail: po.supplier.email,
                    supplierName: po.supplier.name,
                    poId: po.id,
                    totalAmount: po.totalAmount,
                    currency: po.currency || 'USD',
                    organizationName: po.buyerOrg.name,
                    notes: po.notes || undefined,
                });
            }
            return updatedRequest;
        });
        await this.notificationService.notifyRole(request.buyerOrgId, 'procurement', 'Sourcing Update: PO Approved & Sent', `Purchase Order ${request.entityId.substring(0, 8)} has been approved and sent to vendor.`, 'success');
        return result;
    }
    async rejectRequest(requestId, userId) {
        const request = await this.prisma.approvalRequest.findUnique({
            where: { id: requestId },
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedRequest = await tx.approvalRequest.update({
                where: { id: requestId },
                data: {
                    status: 'REJECTED',
                    approvedById: userId,
                },
            });
            if (request.entityType === 'PURCHASE_ORDER') {
                await tx.purchaseOrder.update({
                    where: { id: request.entityId },
                    data: { status: 'DRAFT' },
                });
            }
            return updatedRequest;
        });
        await this.notificationService.notifyRole(request.buyerOrgId, 'procurement', 'Sourcing Update: PO Rejected', `Purchase Order ${request.entityId.substring(0, 8)} has been rejected and returned to Draft.`, 'warning');
        return result;
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService,
        email_service_1.EmailService])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map