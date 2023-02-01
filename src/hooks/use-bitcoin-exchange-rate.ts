import { format } from "date-fns";
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { env } from "../data/env";
import { convertRatesToArray } from "../helpers/exchange.helper";
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
  const [latestFetchDateTime, setLatestFetchDateTime] = useState<Date | null>(null);

  const { data, loading, loaded, fetchData } =
    useAxiosGet<BaseExchangeRate>(url);

  useEffect(() => {
    if (data) {
      const rates: ExchangeRate[] = convertRatesToArray(data.rates);
      setExchangeRates(rates);
      setBaseExchangeRate(data);
      setLatestFetchDateTime(new Date());
    }
  }, [data]);

  return {
    baseExchangeRateData: baseExchangeRate,
    exchangeRatesData: exchangeRates,
    fetchData,
    loading,
    loaded,
    latestFetchDateTime: latestFetchDateTime ? format(
      latestFetchDateTime,
      "dd MMM yyyy HH:mm:ss"
    ) : '',
  };
}
