import {
  Controller,
  Post,
  Param,
  UseGuards,
  Get,
  Body,
  Delete,
} from '@nestjs/common';
import { RFQService } from './rfq.service';
import { PermissionsGuard } from '../../core/auth/guards/permissions.guard';
import { RequirePermissions } from '../../core/auth/decorators/permissions.decorator';
import { ActiveOrgId } from '../../core/auth/decorators/active-org.decorator';

@Controller('rfq')
@UseGuards(PermissionsGuard)
export class RFQController {
  constructor(private readonly rfqService: RFQService) { }

  @Post()
  @RequirePermissions({ rfq: ['create'] })
  async createRFQ(@ActiveOrgId() orgId: string, @Body() body: any) {
    return this.rfqService.createRFQ({
      ...body,
      buyerOrgId: orgId,
    });
  }

  @Post(':id/send')
  @RequirePermissions({ rfq: ['send'] })
  async sendRFQ(@Param('id') id: string) {
    return this.rfqService.sendRFQ(id);
  }

  @Get('org/:orgId')
  @RequirePermissions({ rfq: ['read'] })
  async getRFQs(@ActiveOrgId() orgId: string) {
    return this.rfqService.getRFQs(orgId);
  }

  @Get(':id')
  @RequirePermissions({ rfq: ['read'] })
  async getRFQ(@Param('id') id: string) {
    return this.rfqService.getRFQ(id);
  }

  @Post(':id/quote')
  @RequirePermissions({ quote: ['record'] })
  async createQuote(
    @Param('id') id: string,
    @Body() body: { supplierId: string; totalAmount: number; notes?: string },
  ) {
    return this.rfqService.createQuote({
      rfqId: id,
      ...body,
    });
  }

  @Post('quote/:id/status')
  @RequirePermissions({ quote: ['confirm'] })
  async updateQuoteStatus(
    @Param('id') id: string,
    @Body()
    body: { status: 'RECEIVED' | 'CONFIRMED' | 'ACCEPTED' | 'REJECTED' },
  ) {
    return this.rfqService.updateQuoteStatus(id, body.status);
  }

  @Delete(':id')
  @RequirePermissions({ rfq: ['delete'] })
  async deleteRFQ(@Param('id') id: string) {
    return this.rfqService.deleteRFQ(id);
  }
}
