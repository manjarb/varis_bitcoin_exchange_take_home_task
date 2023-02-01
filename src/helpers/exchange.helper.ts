import { ExchangeRate } from "../interfaces/exchange.interface";
import { formatDateString } from "./date.helper";

export function convertRatesToArray(
  rates: Record<string, number>
): ExchangeRate[] {
  return Object.keys(rates).map((key) => ({
    symbol: key,
    rate: rates[key],
  }));
}

export function convertTimeSeriesRateToArray(
  rates: Record<string, Record<string, number>>
): ExchangeRate[] {
  const result: ExchangeRate[] = [];
  Object.keys(rates).forEach((key) => {
    const ratesPerDate = rates[key];
    const rateByDate: ExchangeRate[] = convertRatesToArray(ratesPerDate).map(
      (r) => {
        return {
          ...r,
          date: formatDateString(key, 'dd MMM'),
        };
      }
    );
    result.push(...rateByDate);
  });

  return result;
}

export function getAverageRate(rates: ExchangeRate[]): number {
  return rates.reduce((prev, current) => {
    return prev + current.rate
  }, 0) / rates.length;
}
