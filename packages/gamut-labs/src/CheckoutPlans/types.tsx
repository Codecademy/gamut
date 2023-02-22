export type PlanType = 'basic' | 'pro' | 'pro-silver' | 'pro-gold';

export enum CurrencySymbol {
  DOLLAR = '$',
  POUND = '£',
  EURO = '€',
  RUPEE = '₹',
  KRONA = 'kr',
  KRONE = 'kr',
  ZLOTY = 'zł',
  REAL = 'R$',
  LEV = 'Лв.',
  FRANC = 'Fr.',
  KORUNA = 'Kč',
  KUNA = 'kn',
  FORINT = 'Ft',
  PESO = '$',
  LEU = 'L',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CAD = 'CAD',
  GBP = 'GBP',
  AUD = 'AUD',
  INR = 'INR',
  SEK = 'SEK',
  NOK = 'NOK',
  PLN = 'PLN',
  DKK = 'DKK',
  BRL = 'BRL',
  BGN = 'BGN',
  CHF = 'CHF',
  CZK = 'CZK',
  HRK = 'HRK',
  HUF = 'HUF',
  MXN = 'MXN',
  RON = 'RON',
}

export interface PaymentPlan {
  currency: Currency;
  display_name?: string;
  formatted_monthly_price: string;
  formatted_price: string;
  formatted_savings_six_months?: string;
  currency_symbol?: CurrencySymbol;
  monthly_price_without_savings?: string;
  formatted_savings?: string;
  period_number: number;
  period: 'month' | 'six_months' | 'year';
  plan_id: string;
  price_without_savings: string;
  price: number;
  title: string;
  is_trial_plan?: boolean;
  student_plan?: boolean;
  plan_type: PlanType;
  included_tax_rate?: number;
  upgradable?: boolean;
}

export enum PaymentProvider {
  GOOGLE = 'google',
  RECURLY = 'recurly',
  PAYTM = 'paytm',
  STRIPE = 'stripe',
}

export enum PaymentMethod {
  CREDITCARD = 'credit_card',
  PAYPAL = 'paypal',
  PAYTM = 'paytm',
}

export interface SubscriptionPaymentMethod {
  type: PaymentMethod;
  email: string;
  last4: string;
  zip: string;
  provider:
    | PaymentProvider.RECURLY
    | PaymentProvider.PAYTM
    | PaymentProvider.STRIPE;
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELED = 'canceled',
}

export type Subscription = Partial<BillingSubscriptionRequired> & {
  canUpgradeSub?: boolean;
  currency: Currency;
  discountInCents?: number;
  id: string;
  isPaymentPastDue?: boolean;
  canPauseSub?: boolean;
  canUnpauseSub?: boolean;
  isProPaused?: boolean;
  isProScheduledToPause?: boolean;
  lastPayment?: number;
  lastPaymentDate?: string;
  name: string;
  period: 'month' | 'six_months' | 'year';
  plan: PaymentPlan;
  planType?: PlanType;
  provider: PaymentProvider.RECURLY | PaymentProvider.PAYTM;
  providerId: string;
  sourceDetails: SubscriptionPaymentMethod;
  status: SubscriptionStatus;
  subtotalInCents: number;
  taxInCents: number;
  totalInCents: number;
  unitAmountInCents: number;
  trialActive: boolean;
  isStudentPlan: boolean;
  activeCouponRedemptionAmounts: number[];
  canBeResumed?: boolean;
  isLapsing?: boolean;
};

interface BillingSubscriptionRequired {
  isScheduledToPause: boolean;
  resumeAt: string;
  pausedAt: string;
  periodEndDt: string;
}

export type BillingSubscription = Subscription & BillingSubscriptionRequired;
