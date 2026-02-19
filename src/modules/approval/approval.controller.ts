import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { auth } from '../../core/auth/better-auth'; // Adjust path if needed
import { Headers as HeadersDecorator } from '@nestjs/common';
import { PermissionsGuard } from '../../core/auth/guards/permissions.guard';
import { RequirePermissions } from '../../core/auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../../core/auth/decorators/active-org.decorator';
import { CurrentUser } from '../../core/auth/decorators/current-user.decorator';
import { CreateRuleDto } from './dto/create-rule.dto';

@Controller('approvals')
@UseGuards(PermissionsGuard)
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) { }

  @Post('rules')
  @RequirePermissions({ rule: ['manage'] })
  async createRule(
    @ActiveOrgId() orgId: string,
    @Body() body: CreateRuleDto,
  ) {
    return this.approvalService.createRule({
      ...body,
      buyerOrgId: orgId,
    });
  }

  @Get('rules/:orgId')
  @RequirePermissions({ rule: ['read'] })
  async getRules(@ActiveOrgId() orgId: string) {
    return this.approvalService.getRules(orgId);
  }

  @Get('pending/:orgId')
  @RequirePermissions({ approval: ['read'] })
  async getPendingRequests(@ActiveOrgId() orgId: string) {
    return this.approvalService.getPendingRequests(orgId);
  }

  @Post(':id/approve')
  @RequirePermissions({ approval: ['approve'] })
  async approveRequest(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.approvalService.approveRequest(id, userId);
  }

  @Post(':id/reject')
  @RequirePermissions({ approval: ['approve'] })
  async rejectRequest(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.approvalService.rejectRequest(id, userId);
  }
}
