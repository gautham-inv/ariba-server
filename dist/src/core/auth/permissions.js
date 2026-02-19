"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.approver = exports.procurement = exports.admin = exports.owner = exports.ac = exports.statement = void 0;
const access_1 = require("better-auth/plugins/access");
const access_2 = require("better-auth/plugins/organization/access");
exports.statement = {
    ...access_2.defaultStatements,
    rfq: ['create', 'send', 'read', 'delete'],
    quote: ['record', 'confirm', 'read'],
    purchaseOrder: ['create', 'read', 'send', 'delete'],
    approval: ['approve', 'read'],
    rule: ['manage', 'read'],
    supplier: ['create', 'read', 'update', 'delete'],
    member: ['create', 'update', 'delete', 'read'],
};
exports.ac = (0, access_1.createAccessControl)(exports.statement);
exports.owner = exports.ac.newRole({
    organization: ['update', 'delete'],
    member: ['create', 'update', 'delete', 'read'],
    invitation: ['create', 'cancel'],
    rfq: ['create', 'send', 'read', 'delete'],
    quote: ['record', 'confirm', 'read'],
    purchaseOrder: ['create', 'read', 'send', 'delete'],
    approval: ['approve', 'read'],
    rule: ['manage', 'read'],
    supplier: ['create', 'read', 'update', 'delete'],
});
exports.admin = exports.ac.newRole({
    organization: ['update'],
    member: ['create', 'update', 'delete', 'read'],
    invitation: ['create', 'cancel'],
    rfq: ['create', 'send', 'read', 'delete'],
    quote: ['record', 'confirm', 'read'],
    purchaseOrder: ['create', 'read', 'send', 'delete'],
    approval: ['approve', 'read'],
    rule: ['manage', 'read'],
    supplier: ['create', 'read', 'update', 'delete'],
});
exports.procurement = exports.ac.newRole({
    rfq: ['create', 'send', 'read'],
    quote: ['record', 'confirm', 'read'],
    purchaseOrder: ['create', 'read'],
    supplier: ['create', 'read', 'update', 'delete'],
});
exports.approver = exports.ac.newRole({
    approval: ['approve', 'read'],
    purchaseOrder: ['read'],
    rfq: ['read'],
    quote: ['read'],
});
exports.roles = {
    owner: exports.owner,
    org_owner: exports.owner,
    admin: exports.admin,
    procurement: exports.procurement,
    approver: exports.approver,
};
//# sourceMappingURL=permissions.js.map