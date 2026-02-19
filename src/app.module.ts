import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './core/auth/auth.controller';
import { PrismaModule } from './core/prisma/prisma.module';
import { EmailModule } from './core/email/email.module';
import { RFQModule } from './modules/rfq/rfq.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { ApprovalModule } from './modules/approval/approval.module';
import { NotificationModule } from './modules/notification/notification.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './core/auth/middleware/auth.middleware';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere
    }),
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
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet(), LoggerMiddleware, AuthMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}

