import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PrismaModule } from './prisma/prisma.module';
import { EmailModule } from './email/email.module';
import { RFQModule } from './rfq/rfq.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrganizationModule } from './organization/organization.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { ApprovalModule } from './approval/approval.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    RFQModule,
    SupplierModule,
    OrganizationModule,
    PurchaseOrderModule,
    ApprovalModule,
    NotificationModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
