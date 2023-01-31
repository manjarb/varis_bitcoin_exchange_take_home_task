import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { coinApiHeaders, env } from "../data/env";
import { useAxiosGet } from "./use-axios-get";

export interface ExchangeRate {
  time: string;
  asset_id_quote: string;
  rate: number;
}

export interface BaseExchangeRate {
  asset_id_base: string;
  rates: ExchangeRate[];
}

const baseExchangeRateAtom = atom<BaseExchangeRate | null>(null);

export function useBitcoinExchangeRate() {
  const url = `${env.coinApiUrl}/v1/exchangerate/BTC`;
  const [baseExchangeRate, setBaseExchangeRate] = useAtom(baseExchangeRateAtom);

  const { data, loading, fetchData } = useAxiosGet<BaseExchangeRate>(url, {
    headers: coinApiHeaders,
  });

  useEffect(() => {
    if (data) {
      setBaseExchangeRate(baseExchangeRate);
    }
  }, [data]);

  return {
    data,
    fetchData,
    loading,
  };
}
