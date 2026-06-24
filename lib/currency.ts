import { CURRENCIES, Currency } from './types';

export function getCurrencySymbol(currency: Currency): string {
  return CURRENCIES.find(c => c.code === currency)?.symbol || currency;
}

export function getCurrencyName(currency: Currency): string {
  return CURRENCIES.find(c => c.code === currency)?.name || currency;
}

export function formatPrice(price: number, currency: Currency): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol} ${price.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatMileage(mileage: number): string {
  return mileage.toLocaleString('ar-SA');
}
