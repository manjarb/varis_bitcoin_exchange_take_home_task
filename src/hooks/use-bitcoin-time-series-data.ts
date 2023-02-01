import { format } from "date-fns";
import { useEffect, useState } from "react";
import { env } from "../data/env";
import { getPreviousDateFromToday } from "../helpers/date.helper";
import { ExchangeRate, TimeSeriesRate } from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";
import { currencyId } from "../data/env";
import { atom, useAtom } from "jotai";
import { convertTimeSeriesRateToArray } from "../helpers/exchange.helper";

const baseTimeSeriesRateAtom = atom<TimeSeriesRate | null>(null);
const timeSeriesRateAtom = atom<ExchangeRate[] | null>(null);

export function useBitcoinTimeSeriesData(
  assetId: string | undefined,
  dateRange = 7
) {
  const dateFormat = "yyyy-MM-dd";
  const preDate = getPreviousDateFromToday(dateRange);
  const formatToday = format(new Date(), dateFormat);
  const formatPreDay = format(preDate, dateFormat);
  const url = `${env.exchangeRateApiUrl}/timeseries?base=${currencyId.BTC}&start_date=${formatPreDay}&end_date=${formatToday}&symbols=${assetId}`;

  const [baseTimeSeriesRate, setBaseTimeSeriesRate] = useAtom(
    baseTimeSeriesRateAtom
  );
  const [timeSeriesRate, setTimeSeriesRate] = useAtom(timeSeriesRateAtom);
  const { data, loading, loaded, fetchData } = useAxiosGet<TimeSeriesRate>(url);
  const [latestFetchDateTime, setLatestFetchDateTime] = useState<Date | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setBaseTimeSeriesRate(data);
      const timeseriesData = convertTimeSeriesRateToArray(data.rates);
      setTimeSeriesRate(timeseriesData);
      setLatestFetchDateTime(new Date());
    }
  }, [data]);

  return {
    baseTimeSeriesRateData: baseTimeSeriesRate,
    timeSeriesRateData: timeSeriesRate,
    fetchData,
    loading,
    loaded,
    latestFetchDateTime: latestFetchDateTime ? format(
      latestFetchDateTime,
      "dd MMM yyyy HH:mm:ss"
    ) : '',
  };
}
