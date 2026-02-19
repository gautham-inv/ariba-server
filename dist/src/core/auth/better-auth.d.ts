export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    emailAndPassword: {
        enabled: true;
    };
    databaseHooks: {
        user: {
            create: {
                after: (user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    emailVerified: boolean;
                    name: string;
                    email?: string;
                    image?: string;
                } & Record<string, unknown>) => Promise<void>;
            };
        };
        session: {
            create: {
                before: (session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string;
                    userAgent?: string;
                } & Record<string, unknown>) => Promise<{
                    data: {
                        activeOrganizationId: string;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        userId: string;
                        expiresAt: Date;
                        token: string;
                        ipAddress?: string;
                        userAgent?: string;
                    };
                }>;
            };
        };
    };
    plugins: [import("better-auth/plugins").DefaultOrganizationPlugin<{
        ac: {
            newRole<K extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule" | "team" | "ac">(statements: import("better-auth/plugins").Subset<K, {
                readonly rfq: readonly ["create", "send", "read", "delete"];
                readonly quote: readonly ["record", "confirm", "read"];
                readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                readonly approval: readonly ["approve", "read"];
                readonly rule: readonly ["manage", "read"];
                readonly supplier: readonly ["create", "read", "update", "delete"];
                readonly member: readonly ["create", "update", "delete", "read"];
                readonly organization: readonly ["update", "delete"];
                readonly invitation: readonly ["create", "cancel"];
                readonly team: readonly ["create", "update", "delete"];
                readonly ac: readonly ["create", "read", "update", "delete"];
            }>): {
                authorize<K_1 extends K>(request: K_1 extends infer T extends K_2 ? { [key in T]?: import("better-auth/plugins").Subset<K, {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<K, {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<K, {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
            statements: {
                readonly rfq: readonly ["create", "send", "read", "delete"];
                readonly quote: readonly ["record", "confirm", "read"];
                readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                readonly approval: readonly ["approve", "read"];
                readonly rule: readonly ["manage", "read"];
                readonly supplier: readonly ["create", "read", "update", "delete"];
                readonly member: readonly ["create", "update", "delete", "read"];
                readonly organization: readonly ["update", "delete"];
                readonly invitation: readonly ["create", "cancel"];
                readonly team: readonly ["create", "update", "delete"];
                readonly ac: readonly ["create", "read", "update", "delete"];
            };
        };
        roles: {
            owner: {
                authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
            org_owner: {
                authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
            admin: {
                authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
            procurement: {
                authorize<K_1 extends "supplier" | "quote" | "purchaseOrder" | "rfq">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
            approver: {
                authorize<K_1 extends "quote" | "purchaseOrder" | "rfq" | "approval">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>[key] | {
                    actions: import("better-auth/plugins").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
                        readonly rfq: readonly ["create", "send", "read", "delete"];
                        readonly quote: readonly ["record", "confirm", "read"];
                        readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                        readonly approval: readonly ["approve", "read"];
                        readonly rule: readonly ["manage", "read"];
                        readonly supplier: readonly ["create", "read", "update", "delete"];
                        readonly member: readonly ["create", "update", "delete", "read"];
                        readonly organization: readonly ["update", "delete"];
                        readonly invitation: readonly ["create", "cancel"];
                        readonly team: readonly ["create", "update", "delete"];
                        readonly ac: readonly ["create", "read", "update", "delete"];
                    }>[key];
                    connector: "OR" | "AND";
                }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins").AuthorizeResponse;
                statements: import("better-auth/plugins").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
                    readonly rfq: readonly ["create", "send", "read", "delete"];
                    readonly quote: readonly ["record", "confirm", "read"];
                    readonly purchaseOrder: readonly ["create", "read", "send", "delete"];
                    readonly approval: readonly ["approve", "read"];
                    readonly rule: readonly ["manage", "read"];
                    readonly supplier: readonly ["create", "read", "update", "delete"];
                    readonly member: readonly ["create", "update", "delete", "read"];
                    readonly organization: readonly ["update", "delete"];
                    readonly invitation: readonly ["create", "cancel"];
                    readonly team: readonly ["create", "update", "delete"];
                    readonly ac: readonly ["create", "read", "update", "delete"];
                }>;
            };
        };
        creatorRoleId: string;
        sendInvitationEmail(data: {
            id: string;
            role: string;
            email: string;
            organization: import("better-auth/plugins").Organization;
            invitation: import("better-auth/plugins").Invitation;
            inviter: import("better-auth/plugins").Member & {
                user: import("better-auth").User;
            };
        }): Promise<void>;
        organizationHooks: {
            afterAcceptInvitation: (ctx: {
                invitation: import("better-auth/plugins").Invitation & Record<string, any>;
                member: import("better-auth/plugins").Member & Record<string, any>;
                user: import("better-auth").User & Record<string, any>;
                organization: import("better-auth/plugins").Organization & Record<string, any>;
            }) => Promise<void>;
        };
    }>];
    trustedOrigins: string[];
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none";
            secure: true;
        };
    };
}>;
