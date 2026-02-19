"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/prisma/prisma.service");
let NotificationService = class NotificationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNotification(data) {
        try {
            return await this.prisma.notification.create({
                data: {
                    userId: data.userId,
                    title: data.title,
                    message: data.message,
                    type: data.type,
                },
            });
        }
        catch (error) {
            console.error('Failed to create notification', error);
        }
    }
    async markAsRead(id) {
        return await this.prisma.notification.update({
            where: { id },
            data: { read: true },
        });
    }
    async notifyRole(orgId, role, title, message, type = 'info') {
        const members = await this.prisma.member.findMany({
            where: {
                organizationId: orgId,
                role: { contains: role, mode: 'insensitive' },
            },
            select: { userId: true },
        });
        const notifications = members.map((m) => this.createNotification({
            userId: m.userId,
            title,
            message,
            type,
        }));
        return Promise.all(notifications);
    }
    async notifyOwner(orgId, title, message, type = 'info') {
        return this.notifyRole(orgId, 'owner', title, message, type);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map