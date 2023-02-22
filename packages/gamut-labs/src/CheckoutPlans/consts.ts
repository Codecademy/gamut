import { Currency, CurrencySymbol } from './types';

interface Detail {
  id: string;
  title: string;
  tag: string;
  isLite: boolean;
  features: Record<string, boolean>;
  newFeatures?: Record<string, boolean>;
}

type PlanDetails = Record<string, Detail>;

export const planDetails: PlanDetails = {
  pro: {
    id: 'pro',
    title: 'Pro',
    tag: 'Learn a skill',
    isLite: false,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
    },
  },
  'pro-gold': {
    id: 'pro-gold',
    title: 'Pro',
    tag: 'Build a career',
    isLite: false,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
      'Career paths': true,
      'Technical interview prep': true,
      'Code challenges': true,
    },
    newFeatures: {
      'Professional certifications': true,
      'Career services': true,
      Assessments: true,
    },
  },
  'pro-silver': {
    id: 'pro-silver',
    title: 'Plus',
    tag: 'Learn a skill',
    isLite: true,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
      'Career paths': false,
      'Technical interview prep': false,
      'Code challenges': false,
    },
    newFeatures: {
      'Professional certifications': false,
      'Career services': false,
      Assessments: false,
    },
  },
};

const currencySymbols: Record<Currency, CurrencySymbol> = {
  [Currency.USD]: CurrencySymbol.DOLLAR,
  [Currency.CAD]: CurrencySymbol.DOLLAR,
  [Currency.AUD]: CurrencySymbol.DOLLAR,
  [Currency.EUR]: CurrencySymbol.EURO,
  [Currency.GBP]: CurrencySymbol.POUND,
  [Currency.INR]: CurrencySymbol.RUPEE,
  [Currency.SEK]: CurrencySymbol.KRONA,
  [Currency.NOK]: CurrencySymbol.KRONE,
  [Currency.PLN]: CurrencySymbol.ZLOTY,
  [Currency.DKK]: CurrencySymbol.KRONE,
  [Currency.BRL]: CurrencySymbol.REAL,
  [Currency.BGN]: CurrencySymbol.LEV,
  [Currency.CHF]: CurrencySymbol.FRANC,
  [Currency.CZK]: CurrencySymbol.KORUNA,
  [Currency.HRK]: CurrencySymbol.KUNA,
  [Currency.HUF]: CurrencySymbol.FORINT,
  [Currency.MXN]: CurrencySymbol.PESO,
  [Currency.RON]: CurrencySymbol.LEU,
};

export const getCurrencySymbol = (currency: Currency) =>
  currencySymbols[currency];
