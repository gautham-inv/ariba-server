import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../auth/decorators/active-org.decorator';

@Controller('suppliers')
@UseGuards(PermissionsGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @RequirePermissions({ supplier: ['create'] })
  async createSupplier(
    @ActiveOrgId() orgId: string,
    @Body() body: { name: string; email: string },
  ) {
    return this.supplierService.createSupplier({
      ...body,
      buyerOrgId: orgId,
    });
  }

  @Get('org/:orgId')
  @RequirePermissions({ supplier: ['read'] })
  async getSuppliersByOrg(@ActiveOrgId() orgId: string) {
    return this.supplierService.getSuppliersByOrg(orgId);
  }
}
