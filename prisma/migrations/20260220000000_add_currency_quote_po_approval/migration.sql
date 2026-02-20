-- Add currency column to Quote (for multi-currency propagation from RFQ)
ALTER TABLE "Quote" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'USD';

-- Add currency column to PurchaseOrder (propagated from Quote)
ALTER TABLE "PurchaseOrder" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'USD';

-- Add currency column to ApprovalRule (for currency-aware approval thresholds)
ALTER TABLE "ApprovalRule" ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'USD';
