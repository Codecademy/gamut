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
