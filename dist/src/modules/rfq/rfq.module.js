"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFQModule = void 0;
const common_1 = require("@nestjs/common");
const rfq_service_1 = require("./rfq.service");
const rfq_controller_1 = require("./rfq.controller");
const prisma_module_1 = require("../../core/prisma/prisma.module");
const email_module_1 = require("../../core/email/email.module");
let RFQModule = class RFQModule {
};
exports.RFQModule = RFQModule;
exports.RFQModule = RFQModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, email_module_1.EmailModule],
        providers: [rfq_service_1.RFQService],
        controllers: [rfq_controller_1.RFQController],
        exports: [rfq_service_1.RFQService],
    })
], RFQModule);
//# sourceMappingURL=rfq.module.js.map