import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { coinApiHeaders, env } from "../data/env";
import { BaseExchangeRate } from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

const baseExchangeRateAtom = atom<BaseExchangeRate | null>(null);

export function useBitcoinExchangeRate() {
  const url = `${env.coinApiUrl}/v1/exchangerate/BTC`;
  const [baseExchangeRate, setBaseExchangeRate] = useAtom(baseExchangeRateAtom);

  const { data, loading, loaded, fetchData } = useAxiosGet<BaseExchangeRate>(url, {
    headers: coinApiHeaders,
  });

  useEffect(() => {
    if (data) {
      setBaseExchangeRate(data);
    }
  }, [data]);

  return {
    data: baseExchangeRate,
    fetchData,
    loading,
    loaded,
  };
}
