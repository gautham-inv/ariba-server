import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { EmailService } from '../../core/email/email.service';
import { RFQStatus } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class RFQService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private notificationService: NotificationService,
  ) { }

  async createRFQ(data: {
    buyerOrgId: string;
    title: string;
    dueDate: Date;
    currency: string;
    notes?: string;
    items: {
      name: string;
      description?: string;
      quantity: number;
      unit: string;
    }[];
    supplierIds: string[];
  }) {
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

  async sendRFQ(rfqId: string) {
    // 1. Fetch the RFQ with its items, suppliers, and organization info
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
      throw new NotFoundException(`RFQ with ID ${rfqId} not found`);
    }

    if (rfq.status === RFQStatus.CLOSED) {
      throw new BadRequestException('Cannot send a closed RFQ');
    }

    if (rfq.suppliers.length === 0) {
      throw new BadRequestException('No suppliers assigned to this RFQ');
    }

    // 2. Loop through assigned suppliers and send emails
    const results = await Promise.all(
      rfq.suppliers.map(async (rfqSupplier) => {
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
      }),
    );

    // 3. Update RFQ status to SENT if at least one email was sent successfully
    const atLeastOneSuccess = results.some((success) => success === true);

    if (atLeastOneSuccess) {
      await this.prisma.rFQ.update({
        where: { id: rfqId },
        data: { status: RFQStatus.SENT },
      });
    }

    return {
      success: atLeastOneSuccess,
      totalSuppliers: rfq.suppliers.length,
      successfulEmails: results.filter((s) => s === true).length,
    };
  }

  async getRFQs(organizationId: string) {
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

  async getRFQ(id: string) {
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
      throw new NotFoundException(`RFQ with ID ${id} not found`);
    }

    return rfq;
  }

  async createQuote(data: {
    rfqId: string;
    supplierId: string;
    totalAmount: number;
    notes?: string;
  }) {
    const rfq = await this.prisma.rFQ.findUnique({
      where: { id: data.rfqId },
    });

    if (!rfq) {
      throw new NotFoundException('RFQ not found');
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
      throw new BadRequestException('Supplier was not invited to this RFQ');
    }

    const quote = (await this.prisma.quote.create({
      data: {
        rfqId: data.rfqId,
        supplierId: data.supplierId,
        buyerOrgId: rfq.buyerOrgId,
        totalAmount: data.totalAmount,
        notes: data.notes,
        status: 'RECEIVED',
      } as any,
      include: { supplier: true },
    })) as any;

    // Notify procurement
    await this.notificationService.notifyRole(
      rfq.buyerOrgId,
      'procurement',
      'New Quote Received',
      `A new quote was received from ${quote.supplier?.name || 'a supplier'} for RFQ: ${rfq.title}`,
      'info',
    );

    return quote;
  }

  async updateQuoteStatus(
    quoteId: string,
    status: 'RECEIVED' | 'CONFIRMED' | 'ACCEPTED' | 'REJECTED',
  ) {
    const quote = await this.prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    return this.prisma.quote.update({
      where: { id: quoteId },
      data: { status },
    });
  }

  async deleteRFQ(id: string) {
    const rfq = await this.prisma.rFQ.findUnique({
      where: { id },
      include: { quotes: true },
    });

    if (!rfq) throw new NotFoundException('RFQ not found');

    return this.prisma.$transaction(async (tx) => {
      // Delete related quotes first (since no cascade in schema)
      await tx.quote.deleteMany({
        where: { rfqId: id },
      });

      // Delete the RFQ (Items and Suppliers will cascade per schema)
      return tx.rFQ.delete({
        where: { id },
      });
    });
  }
}
