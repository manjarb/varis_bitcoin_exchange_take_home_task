export interface ExchangeRate {
  time: string;
  asset_id_quote: string;
  rate: number;
}

export interface ExchangeRatePair extends ExchangeRate {
  asset_id_base: string;
}

export interface BaseExchangeRate {
  asset_id_base: string;
  rates: ExchangeRate[];
}

export interface AssetIcon {
  asset_id: string;
  url: string;
}
