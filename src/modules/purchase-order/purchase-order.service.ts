import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
  ) { }

  async createPO(data: {
    buyerOrgId: string;
    quoteId: string;
    notes?: string;
  }) {
    // 1. Fetch Quote
    const quote = await this.prisma.quote.findUnique({
      where: { id: data.quoteId },
      include: { supplier: true },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    // Logic check: Quote should be CONFIRMED to create a PO
    if (quote.status !== 'CONFIRMED') {
      throw new BadRequestException(
        `Cannot create PO from quote with status ${quote.status}. Quote must be CONFIRMED.`,
      );
    }

    const result = await this.prisma.$transaction(async (tx) => {
      // 2. Create PO (Initially DRAFT or PENDING?)
      // We will update status based on approval rules shortly.
      // Let's create it first.
      const po = await tx.purchaseOrder.create({
        data: {
          buyerOrgId: data.buyerOrgId,
          supplierId: quote.supplierId,
          quoteId: quote.id,
          rfqId: quote.rfqId,
          totalAmount: quote.totalAmount,
          status: 'DRAFT',
          notes: data.notes,
        } as any,
      });

      // 3. Evaluate Approval Rules
      // We need to use the service logic, but it uses `this.prisma` which is outside transaction `tx`.
      // Ideally `evaluatePORules` should accept a transaction client or we perform logic here.
      // For MVP simplicity and because `evaluatePORules` mostly reads, we can read outside or inside.
      // BUT `createApprovalRequest` writes. Writing outside `tx` is risky if `po` creation fails (it won't exist).
      // `evaluatePORules` in my service implementation does CREATE `ApprovalRequest`.
      // So we should probably modify `evaluatePORules` to accept `tx` OR manually implement logic here.
      // Let's manually implement the check here to use `tx`.

      const applicableRules = await tx.approvalRule.findMany({
        where: {
          buyerOrgId: data.buyerOrgId,
          minAmount: { lte: quote.totalAmount },
        },
      });

      let finalStatus = 'APPROVED'; // Default if no rules match

      if (applicableRules.length > 0) {
        finalStatus = 'PENDING_APPROVAL';
        // Create Approval Request
        await tx.approvalRequest.create({
          data: {
            buyerOrgId: data.buyerOrgId,
            entityId: po.id,
            entityType: 'PURCHASE_ORDER',
            status: 'PENDING',
          },
        });
      }

      // Update PO Status
      const finalPO = await tx.purchaseOrder.update({
        where: { id: po.id },
        data: { status: finalStatus as any },
      });

      // 4. Update Quote status to ACCEPTED
      await tx.quote.update({
        where: { id: quote.id },
        data: { status: 'ACCEPTED' },
      });

      // 5. Update RFQ status to CLOSED
      await tx.rFQ.update({
        where: { id: quote.rfqId },
        data: { status: 'CLOSED' },
      });

      return finalPO;
    });

    // 6. Notify Approvers after transaction succeeds
    if (result.status === 'PENDING_APPROVAL') {
      await this.notificationService.notifyRole(
        data.buyerOrgId,
        'approver',
        'New PO Pending Approval',
        `A new Purchase Order for ${quote.supplier.name} (${quote.totalAmount}) requires your authorization.`,
        'info',
      );
    }

    return result;
  }

  async getPOsByOrg(orgId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { buyerOrgId: orgId },
      include: {
        supplier: true,
        quote: {
          select: {
            id: true,
            // potentially include rfq title via nested relation if needed
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPOById(id: string) {
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

  async deletePO(id: string) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
    });

    if (!po) throw new NotFoundException('Purchase Order not found');

    return this.prisma.$transaction(async (tx) => {
      // Delete related approval requests
      await tx.approvalRequest.deleteMany({
        where: { entityId: id, entityType: 'PURCHASE_ORDER' },
      });

      return tx.purchaseOrder.delete({
        where: { id },
      });
    });
  }

  async sendPO(id: string) {
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

    if (!po) throw new NotFoundException('Purchase Order not found');

    if (po.status !== 'APPROVED') {
      throw new BadRequestException(
        'Only approved POs can be sent to suppliers',
      );
    }

    // Update status to SENT
    const updatedPO = await this.prisma.purchaseOrder.update({
      where: { id },
      data: { status: 'SENT' },
    });

    // In a real app, we would send an actual email here
    // For now, just log and return success
    console.log(
      `[PO SENT] Email would be sent to ${po.supplier.email} for PO ${po.id}`,
    );

    return updatedPO;
  }
}
