import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../auth/decorators/active-org.decorator';

@Controller('purchase-orders')
@UseGuards(PermissionsGuard)
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) {}

  @Post()
  @RequirePermissions({ purchaseOrder: ['create'] })
  async createPO(
    @ActiveOrgId() orgId: string,
    @Body() body: { quoteId: string; notes?: string },
  ) {
    return this.poService.createPO({
      ...body,
      buyerOrgId: orgId,
    });
  }

  @Get('org/:orgId')
  @RequirePermissions({ purchaseOrder: ['read'] })
  async getPOsByOrg(@ActiveOrgId() orgId: string) {
    return this.poService.getPOsByOrg(orgId);
  }

  @Get(':id')
  @RequirePermissions({ purchaseOrder: ['read'] })
  async getPOById(@Param('id') id: string) {
    return this.poService.getPOById(id);
  }

  @Delete(':id')
  @RequirePermissions({ purchaseOrder: ['delete'] })
  async deletePO(@Param('id') id: string) {
    return this.poService.deletePO(id);
  }

  @Post(':id/send')
  @RequirePermissions({ purchaseOrder: ['send'] })
  async sendPO(@Param('id') id: string) {
    return this.poService.sendPO(id);
  }
}
