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
import { PermissionsGuard } from '../../core/auth/guards/permissions.guard';
import { RequirePermissions } from '../../core/auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../../core/auth/decorators/active-org.decorator';
import { CreatePODto } from './dto/create-po.dto';

@Controller('purchase-orders')
@UseGuards(PermissionsGuard)
export class PurchaseOrderController {
  constructor(private readonly poService: PurchaseOrderService) { }

  @Post()
  @RequirePermissions({ purchaseOrder: ['create'] })
  async createPO(
    @ActiveOrgId() orgId: string,
    @Body() body: CreatePODto,
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
