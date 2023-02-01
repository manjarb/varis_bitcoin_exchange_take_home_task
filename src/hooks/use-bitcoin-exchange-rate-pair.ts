import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { currencyId, env } from "../data/env";
import { ConvertExchangeRate } from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

const exchangeRatePairAtom = atom<ConvertExchangeRate | null>(null);

export function useBitcoinExchangeRatePair(pairId: string | undefined) {
  const url = `${env.exchangeRateApiUrl}/convert?from=${currencyId.BTC}&to=${pairId}`;
  const [exchangeRatePair, setExchangeRatePair] = useAtom(exchangeRatePairAtom);

  const { data, loading, loaded, fetchData } =
    useAxiosGet<ConvertExchangeRate>(url);

  useEffect(() => {
    if (data) {
      setExchangeRatePair(data);
    }
  }, [data])

  return {
    data: exchangeRatePair,
    fetchData,
    loading,
    loaded,
  };
}
