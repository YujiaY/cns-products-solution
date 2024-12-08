export interface Product {
  product_id: string; // CommBank’s unique identifier for this product.
  effective_from: string;
  effective_to: string;
  product_category: string;
  name: string;
  description: string;
  brand?: string;
}

export interface ProductDetail {
  product_id: string; // CommBank’s unique identifier for this product.
  name: string;
  description: string;
  features: Feature[];
  eligibility: Eligibility[];
  fees: Fee[];
}

type FeatureType =
  | "CARD_ACCESS"
  | "ADDITIONAL_CARDS"
  | "UNLIMITED_TXNS"
  | "FREE_TXNS"
  | "FREE_TXNS_ALLOWANCE"
  | "LOYALTY_PROGRAM"
  | "OFFSET"
  | "OVERDRAFT"
  | "REDRAW"
  | "INSURANCE"
  | "BALANCE_TRANSFERS"
  | "INTEREST_FREE"
  | "INTEREST_FREE_TRANSFERS"
  | "DIGITAL_WALLET"
  | "DIGITAL_BANKING"
  | "NPP_PAYID"
  | "NPP_ENABLED"
  | "DONATE_INTEREST"
  | "BILL_PAYMENT"
  | "COMPLEMENTARY_PRODUCT_DISCOUNTS"
  | "BONUS_REWARDS"
  | "NOTIFICATIONS"
  | "OTHER";

interface Feature {
  featureType: FeatureType;
  additionalValue?: string;
}

type EligibilityType =
  | "BUSINESS"
  | "PENSION_RECIPIENT"
  | "MIN_AGE"
  | "MAX_AGE"
  | "MIN_INCOME"
  | "MIN_TURNOVER"
  | "STAFF"
  | "STUDENT"
  | "EMPLOYMENT_STATUS"
  | "RESIDENCY_STATUS"
  | "NATURAL_PERSON"
  | "INTRODUCTORY"
  | "OTHER";

interface Eligibility {
  eligibilityType: EligibilityType;
  additionalValue?: string;
  additionalInfo?: string;
  additionalInfoUri?: string;
}

type FeeType =
  | "PERIODIC"
  | "TRANSACTION"
  | "WITHDRAWAL"
  | "DEPOSIT"
  | "PAYMENT"
  | "PURCHASE"
  | "EVENT"
  | "UPFRONT"
  | "EXIT";
interface Fee {
  name: string;
  feeType: FeeType;
  amount?: string;
  balanceRate?: string;
  transactionRate?: string;
  accruedRate?: string;
  accrualFrequency?: string;
  currency?: string;
  additionalValue?: string;
  additionalInfo?: string;
  additionalInfoUri?: string;
}
