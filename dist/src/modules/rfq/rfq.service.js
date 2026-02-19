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
exports.RFQService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
const email_service_1 = require("../../core/email/email.service");
const client_1 = require("@prisma/client");
const notification_service_1 = require("../notification/notification.service");
let RFQService = class RFQService {
    constructor(prisma, emailService, notificationService) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }
    async createRFQ(data) {
        return this.prisma.rFQ.create({
            data: {
                buyerOrgId: data.buyerOrgId,
                title: data.title,
                dueDate: new Date(data.dueDate),
                currency: data.currency,
                notes: data.notes,
                status: 'DRAFT',
                items: {
                    create: data.items,
                },
                suppliers: {
                    create: data.supplierIds.map((id) => ({
                        supplierId: id,
                    })),
                },
            },
            include: {
                items: true,
                suppliers: {
                    include: {
                        supplier: true,
                    },
                },
            },
        });
    }
    async sendRFQ(rfqId) {
        const rfq = await this.prisma.rFQ.findUnique({
            where: { id: rfqId },
            include: {
                items: true,
                suppliers: {
                    include: {
                        supplier: true,
                    },
                },
                buyerOrg: true,
            },
        });
        if (!rfq) {
            throw new common_1.NotFoundException(`RFQ with ID ${rfqId} not found`);
        }
        if (rfq.status === client_1.RFQStatus.CLOSED) {
            throw new common_1.BadRequestException('Cannot send a closed RFQ');
        }
        if (rfq.suppliers.length === 0) {
            throw new common_1.BadRequestException('No suppliers assigned to this RFQ');
        }
        const results = await Promise.all(rfq.suppliers.map(async (rfqSupplier) => {
            const supplier = rfqSupplier.supplier;
            return this.emailService.sendRFQ({
                supplierEmail: supplier.email,
                supplierName: supplier.name,
                rfqTitle: rfq.title,
                rfqId: rfq.id,
                dueDate: rfq.dueDate,
                organizationName: rfq.buyerOrg.name,
                rfqNotes: rfq.notes || undefined,
                items: rfq.items.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    unit: item.unit,
                    description: item.description || undefined,
                })),
            });
        }));
        const atLeastOneSuccess = results.some((success) => success === true);
        if (atLeastOneSuccess) {
            await this.prisma.rFQ.update({
                where: { id: rfqId },
                data: { status: client_1.RFQStatus.SENT },
            });
        }
        return {
            success: atLeastOneSuccess,
            totalSuppliers: rfq.suppliers.length,
            successfulEmails: results.filter((s) => s === true).length,
        };
    }
    async getRFQs(organizationId) {
        return this.prisma.rFQ.findMany({
            where: { buyerOrgId: organizationId },
            include: {
                suppliers: {
                    include: {
                        supplier: true,
                    },
                },
                quotes: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getRFQ(id) {
        const rfq = await this.prisma.rFQ.findUnique({
            where: { id },
            include: {
                items: true,
                suppliers: {
                    include: {
                        supplier: true,
                    },
                },
                quotes: {
                    include: {
                        supplier: true,
                        files: true,
                    },
                },
                buyerOrg: true,
            },
        });
        if (!rfq) {
            throw new common_1.NotFoundException(`RFQ with ID ${id} not found`);
        }
        return rfq;
    }
    async createQuote(data) {
        const rfq = await this.prisma.rFQ.findUnique({
            where: { id: data.rfqId },
        });
        if (!rfq) {
            throw new common_1.NotFoundException('RFQ not found');
        }
        const isInvited = await this.prisma.rFQSupplier.findUnique({
            where: {
                rfqId_supplierId: {
                    rfqId: data.rfqId,
                    supplierId: data.supplierId,
                },
            },
        });
        if (!isInvited) {
            throw new common_1.BadRequestException('Supplier was not invited to this RFQ');
        }
        const quote = (await this.prisma.quote.create({
            data: {
                rfqId: data.rfqId,
                supplierId: data.supplierId,
                buyerOrgId: rfq.buyerOrgId,
                totalAmount: data.totalAmount,
                notes: data.notes,
                status: 'RECEIVED',
            },
            include: { supplier: true },
        }));
        await this.notificationService.notifyRole(rfq.buyerOrgId, 'procurement', 'New Quote Received', `A new quote was received from ${quote.supplier?.name || 'a supplier'} for RFQ: ${rfq.title}`, 'info');
        return quote;
    }
    async updateQuoteStatus(quoteId, status) {
        const quote = await this.prisma.quote.findUnique({
            where: { id: quoteId },
        });
        if (!quote) {
            throw new common_1.NotFoundException('Quote not found');
        }
        return this.prisma.quote.update({
            where: { id: quoteId },
            data: { status },
        });
    }
    async deleteRFQ(id) {
        const rfq = await this.prisma.rFQ.findUnique({
            where: { id },
            include: { quotes: true },
        });
        if (!rfq)
            throw new common_1.NotFoundException('RFQ not found');
        return this.prisma.$transaction(async (tx) => {
            await tx.quote.deleteMany({
                where: { rfqId: id },
            });
            return tx.rFQ.delete({
                where: { id },
            });
        });
    }
};
exports.RFQService = RFQService;
exports.RFQService = RFQService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService,
        notification_service_1.NotificationService])
], RFQService);
//# sourceMappingURL=rfq.service.js.map