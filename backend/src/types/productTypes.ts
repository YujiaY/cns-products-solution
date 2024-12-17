export interface IncomingProduct {
  productId: string; // CommBank’s unique identifier for this product.
  lastUpdated: string;
  productCategory: string;
  name: string;
  description: string;
  brand: string;
  isTailored: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  brandName?: string;
  applicationUri?: string;
  additionalInformation: {
    overviewUri?: string;
    termsUri?: string;
    eligibilityUri?: string;
    feesAndPricingUri?: string;
    bundleUri?: string;
  };
}

export interface Product {
  product_id: string;
  name: string;
  description: string;
  brand: string;
  product_category: string;
  effective_from: string;
  effective_to: string;
}

export interface IncomingProductDetail {
  productId: string; // CommBank’s unique identifier for this product.
  name: string;
  description: string;
  features?: Feature[] | null;
  eligibility?: Eligibility[] | null;
  fees?: Fee[] | null;
}

export interface ProductDetail {
  product_id: string;
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
