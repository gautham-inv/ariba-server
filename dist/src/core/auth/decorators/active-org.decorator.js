"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveOrgId = void 0;
const common_1 = require("@nestjs/common");
exports.ActiveOrgId = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.session;
    if (!session || !session.activeOrganizationId) {
        throw new common_1.UnauthorizedException('No active organization selected');
    }
    return session.activeOrganizationId;
});
//# sourceMappingURL=active-org.decorator.js.map