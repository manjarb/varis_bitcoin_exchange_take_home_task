export interface ExchangeRate {
  symbol: string;
  rate: number;
  date?: string;
}

export interface BaseExchangeRate {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConvertExchangeRate {
  date: string;
  historical: boolean;
  result: number;
  query: {
    amount: number;
    from: string;
    to: string;
  }
}

export interface TimeSeriesRate {
  success: boolean;
  timeseries: boolean;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}
