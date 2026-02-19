import { Controller, Post, Get, Body, Param, UseGuards, Delete } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { PermissionsGuard } from '../../core/auth/guards/permissions.guard';
import { RequirePermissions } from '../../core/auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../../core/auth/decorators/active-org.decorator';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('suppliers')
@UseGuards(PermissionsGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  @RequirePermissions({ supplier: ['create'] })
  async createSupplier(
    @ActiveOrgId() orgId: string,
    @Body() body: CreateSupplierDto,
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

  @Delete(':id')
  @RequirePermissions({ supplier: ['delete'] })
  async deleteSupplier(@Param('id') id: string) {
    return this.supplierService.deleteSupplier(id);
  }
}
