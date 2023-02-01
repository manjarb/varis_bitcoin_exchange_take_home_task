import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { env } from "../data/env";
import {
  BaseExchangeRate,
  ExchangeRate,
} from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

const baseExchangeRateAtom = atom<BaseExchangeRate | null>(null);
const exchangeRatesAtom = atom<ExchangeRate[] | null>(null);

export function useBitcoinExchangeRate() {
  const url = `${env.exchangeRateApiUrl}/latest?base=BTC`;
  const [baseExchangeRate, setBaseExchangeRate] = useAtom(baseExchangeRateAtom);
  const [exchangeRates, setExchangeRates] = useAtom(exchangeRatesAtom);

  const { data, loading, loaded, fetchData } =
    useAxiosGet<BaseExchangeRate>(url);

  useEffect(() => {
    if (data) {
      const rates: ExchangeRate[] = Object.keys(data.rates).map((key) => ({
        symbol: key,
        rate: data.rates[key],
      }));
      setExchangeRates(rates);
      setBaseExchangeRate(data);
    }
  }, [data]);

  return {
    baseExchangeRateData: baseExchangeRate,
    exchangeRatesData: exchangeRates,
    fetchData,
    loading,
    loaded,
  };
}
