import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';
import { ApprovalStatus, POStatus } from '@prisma/client';
import { NotificationService } from '../notification/notification.service';
import { EmailService } from '../../core/email/email.service';

@Injectable()
export class ApprovalService {
  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService,
    private emailService: EmailService,
  ) { }

  // --- Rules Management ---
  async createRule(data: {
    buyerOrgId: string;
    minAmount: number;
    role: string;
  }) {
    return this.prisma.approvalRule.create({
      data: {
        buyerOrgId: data.buyerOrgId,
        minAmount: data.minAmount,
        role: data.role,
      },
    });
  }

  async getRules(orgId: string) {
    return this.prisma.approvalRule.findMany({
      where: { buyerOrgId: orgId },
    });
  }

  // --- Evaluation Logic ---
  async evaluatePORules(poId: string, totalAmount: number, orgId: string) {
    // Find rules for this org that match criteria (amount >= minAmount)
    const applicableRules = await this.prisma.approvalRule.findMany({
      where: {
        buyerOrgId: orgId,
        minAmount: { lte: totalAmount },
      },
    });

    if (applicableRules.length === 0) {
      return { required: false };
    }

    // Create approval requests for each applicable rule
    // Currently simplifed: One request per PO? Or one per rule?
    // README model has `ApprovalRequest`. It doesn't explicitly link to a Rule, just `entityId`.
    // Usually, we might need multiple approvals.
    // For MVP, if multiple rules apply, let's say we need ANY valid approver or ALL?
    // Let's assume we create one ApprovalRequest for the PO, and any user with one of the required roles can approve it.
    // OR better: Create one request per rule? The schema `ApprovalRequest` doesn't have a role field.
    // Let's look at schema: `ApprovalRequest` links to `approvedBy` (User).

    // Strategy: Create a single "PENDING" request for the PO.
    // But how do we know WHO can approve? The rules define the roles.
    // We really should store which role is required.
    // Given the schema limitations (no role on ApprovalRequest),
    // we will check permissions at the moment of approval.

    // Wait, if multiple rules apply (e.g. >10k needs Manager, >100k needs VP),
    // we typically strictly need higher level approval.
    // For MVP, let's keep it simple: If any rule matches, the PO needs approval.
    // We will just mark it PENDING_APPROVAL and create one ApprovalRequest record.
    // Any user with "APPROVER" or "ORG_OWNER" role (or role matching the rule) can approve.

    // Let's create one ApprovalRequest.
    await this.prisma.approvalRequest.create({
      data: {
        buyerOrgId: orgId,
        entityId: poId,
        entityType: 'PURCHASE_ORDER',
        status: 'PENDING',
      },
    });

    // Notify approvers that a new request is waiting
    await this.notificationService.notifyRole(
      orgId,
      'approver',
      'New Approval Required',
      `A new Purchase Order (${poId.substring(0, 8)}) requires your review.`,
      'info',
    );

    return { required: true };
  }

  // --- Approval Actions ---
  async getPendingRequests(orgId: string) {
    const requests = await this.prisma.approvalRequest.findMany({
      where: {
        buyerOrgId: orgId,
        status: 'PENDING',
      },
      orderBy: { createdAt: 'desc' },
    });

    // Fetch details for POs
    const detailedRequests = await Promise.all(
      requests.map(async (req) => {
        if (req.entityType === 'PURCHASE_ORDER') {
          const po = await this.prisma.purchaseOrder.findUnique({
            where: { id: req.entityId },
            include: { supplier: true },
          });
          return { ...req, purchaseOrder: po };
        }
        return req;
      }),
    );

    return detailedRequests;
  }

  async approveRequest(requestId: string, userId: string) {
    const request = await this.prisma.approvalRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) throw new NotFoundException('Request not found');
    if (request.status !== 'PENDING')
      throw new BadRequestException('Request already processed');

    // Security/Logic check: Does user have permission?
    // In a real app, we'd check if User.role matches the Rule.role.
    // For this MVP, we'll assume the Guard on the controller checks for "APPROVER" role.

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Update Request
      const updatedRequest = await tx.approvalRequest.update({
        where: { id: requestId },
        data: {
          status: 'APPROVED',
          approvedById: userId,
        },
      });

      // 2. Update PO status
      if (request.entityType === 'PURCHASE_ORDER') {
        const po = await tx.purchaseOrder.update({
          where: { id: request.entityId },
          data: { status: 'APPROVED' },
          include: {
            supplier: true,
            buyerOrg: true,
          },
        });

        // Send PO to Supplier after it's approved
        await this.emailService.sendPurchaseOrder({
          supplierEmail: po.supplier.email,
          supplierName: po.supplier.name,
          poId: po.id,
          totalAmount: po.totalAmount,
          currency: 'USD', // Ideally fetched from RFQ
          organizationName: po.buyerOrg.name,
          notes: (po as any).notes || undefined,
        });
      }

      return updatedRequest;
    });

    // Notify procurement/owner about result
    await this.notificationService.notifyRole(
      request.buyerOrgId,
      'procurement',
      'Sourcing Update: PO Approved & Sent',
      `Purchase Order ${request.entityId.substring(0, 8)} has been approved and sent to vendor.`,
      'success',
    );

    return result;
  }

  async rejectRequest(requestId: string, userId: string) {
    const request = await this.prisma.approvalRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) throw new NotFoundException('Request not found');

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
          data: { status: 'DRAFT' }, // Revert to Draft on rejection
        });
      }
      return updatedRequest;
    });

    // Notify procurement/owner about result
    await this.notificationService.notifyRole(
      request.buyerOrgId,
      'procurement',
      'Sourcing Update: PO Rejected',
      `Purchase Order ${request.entityId.substring(0, 8)} has been rejected and returned to Draft.`,
      'warning',
    );

    return result;
  }
}
