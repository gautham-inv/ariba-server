export declare const statement: {
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
export declare const ac: {
    newRole<K extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule" | "team" | "ac">(statements: import("better-auth/plugins/access").Subset<K, {
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
        authorize<K_1 extends K>(request: K_1 extends infer T extends K_2 ? { [key in T]?: import("better-auth/plugins/access").Subset<K, {
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
            actions: import("better-auth/plugins/access").Subset<K, {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<K, {
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
export declare const owner: {
    authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
    }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
    statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
export declare const admin: {
    authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
    }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
    statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
export declare const procurement: {
    authorize<K_1 extends "supplier" | "quote" | "purchaseOrder" | "rfq">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
        actions: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
    }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
    statements: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
export declare const approver: {
    authorize<K_1 extends "quote" | "purchaseOrder" | "rfq" | "approval">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
        actions: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
    }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
    statements: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
export declare const roles: {
    owner: {
        authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
            actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
            actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        authorize<K_1 extends "organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
            actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "supplier" | "quote" | "purchaseOrder" | "rfq" | "approval" | "rule", {
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
        authorize<K_1 extends "supplier" | "quote" | "purchaseOrder" | "rfq">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
            actions: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<"supplier" | "quote" | "purchaseOrder" | "rfq", {
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
        authorize<K_1 extends "quote" | "purchaseOrder" | "rfq" | "approval">(request: K_1 extends infer T extends K ? { [key in T]?: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
            actions: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
        }; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
        statements: import("better-auth/plugins/access").Subset<"quote" | "purchaseOrder" | "rfq" | "approval", {
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
