import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { coinApiHeaders, currencyId, env } from "../data/env";
import {
  ExchangeRatePair,
} from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

const exchangeRatePairAtom = atom<ExchangeRatePair | null>(null);

export function useBitcoinExchangeRatePair(pairId: string | undefined) {
  const url = `${env.coinApiUrl}/v1/exchangerate/${currencyId.BTC}/${pairId}`;
  const [exchangeRatePair, setExchangeRatePair] = useAtom(exchangeRatePairAtom);

  const { data, loading, loaded, fetchData } = useAxiosGet<ExchangeRatePair>(
    url,
    {
      headers: coinApiHeaders,
    }
  );

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
