export interface ExchangeRate {
  symbol: string;
  rate: number;
}

export interface BaseExchangeRate {
  base: string;
  date: string;
  rates: Record<string, number>;
}
