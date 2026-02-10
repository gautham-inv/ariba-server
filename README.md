Procurement MVP – Final Architecture & Flow Document
This document captures the complete architecture, data models, security model, and end-to-end flow for building an SAP Ariba–like procurement MVP using:
NestJS (Backend)
Next.js (Frontend)
better-auth (Authentication)
Prisma + PostgreSQL (Data layer)
SMTP-based Email (Mailer + Nodemailer)
Presigned URL–based File Uploads (internal uploads for RFQ, Quote, PO documents)
Important conceptual clarification
RFQ (Request for Quotation) is a sourcing process artifact, not just a single outbound request.
It represents the buyer’s request plus all supplier responses, which is why quotes are always attached to an RFQ.
The approval engine is involved only after a Purchase Order (PO) exists.

1. Core Design Principles
Buyer-only authentication
Suppliers do not upload files in MVP (Phase 1)
Supplier interaction is email-only
Role-based permissions (not role-based business logic)
Event-driven workflow: RFQ → Quote → PO → Approval → Sent
File uploads performed internally by buyer users via presigned URLs
Supplier self-service (token links / portals) is a future phase, not MVP

2. High-Level Architecture
Frontend (Next.js)
   │
   │ better-auth session
   ▼
Backend (NestJS)
 ├── Auth (better-auth)
 ├── Authorization (Permissions Guard)
 ├── Procurement Domain
 │    ├── Supplier (email-based)
 │    ├── RFQ (Sourcing container)
 │    ├── Quote (Uploaded internally)
 │    ├── Purchase Order
 │    └── Approval Engine
 ├── Email Service (SMTP)
 └── File Upload Service (Presigned URLs – internal only)
   │
   ▼
PostgreSQL (Prisma)


3. Authentication & Authorization
3.1 Authentication
Powered by better-auth
Uses Organization + Membership model
Only buyer organization users authenticate

3.2 Buyer Roles (stored in Membership.role)
ORG_OWNER
PROCUREMENT
APPROVER

3.3 Permission Mapping (Runtime)
Roles are mapped to permissions dynamically at runtime.
Example permissions:
RFQ_CREATE
RFQ_SEND
QUOTE_UPLOAD (internal)
QUOTE_CONFIRM
PO_CREATE
APPROVAL_APPROVE
➡️ Controllers check permissions, not roles

4. Supplier Model (No Authentication)
Suppliers are business entities, not users
Created and managed by buyer users
Identified by email address
All supplier communication happens via email
No supplier login
No supplier upload links in MVP

5. End-to-End Procurement Flow (Phase 1 – MVP)

Step 1: Supplier Creation
Buyer adds supplier (name + email)
Supplier stored under buyer organization

Step 2: RFQ Creation (Sourcing Container)
Created by a Procurement user.
RFQ represents:
Buyer request
Requested items
Invited suppliers
All future quotes
Inputs
RFQ header: title, due date, currency, notes
RFQ items
Selected suppliers
Optional RFQ reference files (specs, drawings)
→ uploaded internally via presigned URLs
Status: DRAFT

Step 3: RFQ Send (Email-Based)
For each selected supplier:
RFQ details sent via email
Email instructions:
“Please email your quotation as an attachment to
quotes@company.com by the due date.”
RFQ status → SENT

Step 4: Supplier Quote Reception (Manual)
Supplier replies via email with quote attachment (PDF / Excel)
Email received at quotes@company.com
System action: None

Step 5: Internal Quote Upload (Critical Step)
Performed by Procurement user:
Opens supplier email
Downloads quote attachment
Navigates to RFQ in the system
Creates a Quote under the RFQ
Uploads quote files via presigned URLs
Enters:
Total amount
Notes
Supplier reference (optional)
Quote status: RECEIVED

Step 6: Internal Quote Review (No Approval)
Procurement reviews uploaded quotes
Confirms correctness
Quote status → CONFIRMED
⚠️ Approval engine is NOT involved at RFQ or Quote stage

Step 7: Purchase Order Creation & Approval
Procurement selects a confirmed quote
Creates a Purchase Order (PO)
PO represents the first financial commitment.
PO statuses:
DRAFT
PENDING_APPROVAL (if approval rules match)
Approval engine:
Evaluates rules
Notifies approvers

Step 8: PO Sent to Supplier
After approval
PO emailed to supplier
Optional PO documents attached or linked
PO status → SENT

6. Next Phase (Automation)
Later automation (supported by current data model):
RFQ email includes secure token link
Supplier uploads quote directly
Quote auto-created and attached to RFQ

7. Email System Architecture
Purpose: Primary workflow driver
Email triggers
RFQ invitation (Supplier)
Approval required
PO approved / sent
Technology
@nestjs-modules/mailer
Nodemailer
SMTP (Gmail / SES / Resend)
Security
No sensitive data in email body
Attachments handled manually in MVP

8. Prisma Data Models

8. Prisma Data Models

8.0 better-auth Core Models
```prisma
model User {
  id            String    @id @default(uuid())
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  password      String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  members     Member[]
  invitations Invitation[]
  sessions    Session[]
  accounts    Account[]
  approvals   ApprovalRequest[]
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  logo      String?
  metadata  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  members          Member[]
  invitations      Invitation[]
  suppliers        Supplier[]
  rfqs             RFQ[]
  purchaseOrders   PurchaseOrder[]
  approvalRules    ApprovalRule[]
  approvalRequests ApprovalRequest[]
}

model Member {
  id             String   @id @default(uuid())
  organizationId String
  userId         String
  role           String
  createdAt      DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([organizationId, userId])
}

model Session {
  id                   String   @id @default(uuid())
  userId               String
  token                String   @unique
  expiresAt            DateTime
  ipAddress            String?
  userAgent            String?
  activeOrganizationId String?
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

8.1 Supplier
```prisma
model Supplier {
  id         String         @id @default(uuid())
  buyerOrgId String
  name       String
  email      String
  status     SupplierStatus
  createdAt  DateTime       @default(now())

  buyerOrg       Organization    @relation(fields: [buyerOrgId], references: [id])
  rfqs           RFQSupplier[]
  quotes         Quote[]
  purchaseOrders PurchaseOrder[]
}

enum SupplierStatus {
  ACTIVE
  INACTIVE
}
```

8.2 RFQ (Sourcing Container)
```prisma
model RFQ {
  id         String    @id @default(uuid())
  buyerOrgId String
  title      String
  dueDate    DateTime
  currency   String
  notes      String?
  status     RFQStatus
  createdAt  DateTime  @default(now())

  buyerOrg  Organization  @relation(fields: [buyerOrgId], references: [id])
  items     RFQItem[]
  suppliers RFQSupplier[]
  quotes    Quote[]
  files     FileObject[]
}

enum RFQStatus {
  DRAFT
  SENT
  CLOSED
}
```

8.3 RFQItem (What is being requested)
```prisma
model RFQItem {
  id          String  @id @default(uuid())
  rfqId       String
  name        String
  description String?
  quantity    Float
  unit        String

  rfq RFQ @relation(fields: [rfqId], references: [id], onDelete: Cascade)
}
```

8.4 RFQSupplier (Who was invited)
```prisma
model RFQSupplier {
  id         String   @id @default(uuid())
  rfqId      String
  supplierId String
  invitedAt  DateTime @default(now())

  rfq      RFQ      @relation(fields: [rfqId], references: [id], onDelete: Cascade)
  supplier Supplier @relation(fields: [supplierId], references: [id])

  @@unique([rfqId, supplierId])
}
```

8.5 Quote (Supplier Response – Uploaded Internally)
```prisma
model Quote {
  id          String      @id @default(uuid())
  rfqId       String
  supplierId  String
  totalAmount Float
  notes       String?
  status      QuoteStatus
  submittedAt DateTime    @default(now())

  rfq           RFQ            @relation(fields: [rfqId], references: [id])
  supplier      Supplier       @relation(fields: [supplierId], references: [id])
  files         FileObject[]
  purchaseOrder PurchaseOrder?
}

enum QuoteStatus {
  RECEIVED
  CONFIRMED
  ACCEPTED
  REJECTED
}
```

8.6 Purchase Order
```prisma
model PurchaseOrder {
  id          String   @id @default(uuid())
  buyerOrgId  String
  supplierId  String
  rfqId       String?
  quoteId     String?  @unique
  totalAmount Float
  status      POStatus
  createdAt   DateTime @default(now())

  buyerOrg Organization @relation(fields: [buyerOrgId], references: [id])
  supplier Supplier     @relation(fields: [supplierId], references: [id])
  quote    Quote?       @relation(fields: [quoteId], references: [id])
  files    FileObject[]
}

enum POStatus {
  DRAFT
  PENDING_APPROVAL
  APPROVED
  SENT
}
```

8.7 Approval Engine
```prisma
model ApprovalRule {
  id         String   @id @default(uuid())
  buyerOrgId String
  minAmount  Float
  role       String
  createdAt  DateTime @default(now())

  buyerOrg Organization @relation(fields: [buyerOrgId], references: [id])
}

model ApprovalRequest {
  id           String         @id @default(uuid())
  buyerOrgId   String
  entityId     String
  entityType   ApprovalEntity
  status       ApprovalStatus
  approvedById String?
  createdAt    DateTime       @default(now())

  buyerOrg   Organization @relation(fields: [buyerOrgId], references: [id])
  approvedBy User?        @relation(fields: [approvedById], references: [id])
}

enum ApprovalEntity {
  PURCHASE_ORDER
}

enum ApprovalStatus {
  PENDING
  APPROVED
  REJECTED
}
```

8.8 FileObject (Internal Uploads Only)
```prisma
model FileObject {
  id          String        @id @default(uuid())
  ownerType   FileOwnerType
  ownerId     String
  storageKey  String
  contentType String
  uploadedAt  DateTime      @default(now())

  rfqId   String?
  quoteId String? @unique
  poId    String?

  rfq   RFQ?           @relation(fields: [rfqId], references: [id])
  quote Quote?         @relation(fields: [quoteId], references: [id])
  po    PurchaseOrder? @relation(fields: [poId], references: [id])
}

enum FileOwnerType {
  RFQ
  QUOTE
  PO
}
```

📌 A FileObject always belongs to exactly one entity.

9. RFQ Closure Rule
An RFQ is considered CLOSED when:
A PO is created from one of its quotes
or
It is manually closed by procurement after the due date

10. Correct End-to-End Flow (MVP)
RFQ created and emailed
   ↓
Supplier emails quote
   ↓
Procurement uploads quote to RFQ
   ↓
Quote confirmed
   ↓
PO created
   ↓
Approval Engine
   ↓
PO approved
   ↓
PO sent to supplier


