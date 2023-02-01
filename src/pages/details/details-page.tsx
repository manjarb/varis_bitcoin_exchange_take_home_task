import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { formatDateString } from "../../helpers/date.helper";
import { getAverageRate } from "../../helpers/exchange.helper";
import { useBitcoinExchangeRatePair } from "../../hooks/use-bitcoin-exchange-rate-pair";
import { useBitcoinTimeSeriesData } from "../../hooks/use-bitcoin-time-series-data";
import RatesChart from "./components/rates-chart.component";

export default function DetailsPage() {
  let { assetId } = useParams();
  const { data: exchangeData } = useBitcoinExchangeRatePair(assetId);
  const { timeSeriesRateData, fetchData, latestFetchDateTime } =
    useBitcoinTimeSeriesData(assetId, 30);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-5 pb-5">
      <Container maxWidth="lg">
        <div>
          <h1 className="inline-block mr-3 mb-0">{assetId}</h1>
          <span>
            {exchangeData?.date
              ? formatDateString(exchangeData?.date, "dd MMMM yyyy")
              : ""}
          </span>
        </div>
        <div>
          <h2 className="inline-block">
            <span className="green-text mr-2">
              {exchangeData?.result.toLocaleString("en-US")}
            </span>
            {exchangeData?.query.to}
          </h2>
          <p className="inline-block">
            <span className="ml-3 mr-3">=</span>
            {exchangeData?.query.amount} {exchangeData?.query.from}
          </p>
        </div>
        <div>
          Last update <strong>{latestFetchDateTime}</strong>
        </div>
        <div className="mt-10 mb-10">
          {timeSeriesRateData && <RatesChart data={timeSeriesRateData} />}
        </div>
        {timeSeriesRateData && (
          <div>
            <p>30 Days Average Price</p>
            <h2 className="mt-0">
              <span className="mr-2">
                {getAverageRate(timeSeriesRateData).toLocaleString("en-US")}
              </span>
              {exchangeData?.query.to}
            </h2>
          </div>
        )}
      </Container>
    </div>
  );
}
