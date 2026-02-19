"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const helmet_1 = __importDefault(require("helmet"));
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./core/auth/auth.controller");
const prisma_module_1 = require("./core/prisma/prisma.module");
const email_module_1 = require("./core/email/email.module");
const rfq_module_1 = require("./modules/rfq/rfq.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const organization_module_1 = require("./modules/organization/organization.module");
const purchase_order_module_1 = require("./modules/purchase-order/purchase-order.module");
const approval_module_1 = require("./modules/approval/approval.module");
const notification_module_1 = require("./modules/notification/notification.module");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
const auth_middleware_1 = require("./core/auth/middleware/auth.middleware");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply((0, helmet_1.default)(), logger_middleware_1.LoggerMiddleware, auth_middleware_1.AuthMiddleware)
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            email_module_1.EmailModule,
            rfq_module_1.RFQModule,
            supplier_module_1.SupplierModule,
            organization_module_1.OrganizationModule,
            purchase_order_module_1.PurchaseOrderModule,
            approval_module_1.ApprovalModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_interceptor_1.TransformInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map