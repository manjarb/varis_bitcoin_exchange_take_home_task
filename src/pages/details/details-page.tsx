import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { formatDateString } from "../../helpers/date.helper";
import { getAverageRate } from "../../helpers/exchange.helper";
import { useBitcoinExchangeRatePair } from "../../hooks/use-bitcoin-exchange-rate-pair";
import { useBitcoinTimeSeriesData } from "../../hooks/use-bitcoin-time-series-data";
import { ExchangeRate } from "../../interfaces/exchange.interface";
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

  const formatAverageRate = (data: ExchangeRate[]) => {
    return getAverageRate(data).toLocaleString("en-US");
  };

  const getDirectionPrice = (price: number, avgPrice: number) => {
    const directionPrice = ((price - avgPrice) * 100) / avgPrice;

    return directionPrice >= 0 ? (
      <span className="green-text">
        +{directionPrice.toLocaleString("en-US")}%
      </span>
    ) : (
      <span className="red-text">
        -{directionPrice.toLocaleString("en-US")}%
      </span>
    );
  };



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
            <span className="mr-2">
              {exchangeData?.result.toLocaleString("en-US")}
            </span>
            <span className="mr-3">{exchangeData?.query.to}</span>
            <span>
              {exchangeData &&
                timeSeriesRateData &&
                getDirectionPrice(
                  exchangeData?.result,
                  getAverageRate(timeSeriesRateData)
                )}
            </span>
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
                {formatAverageRate(timeSeriesRateData)}
              </span>
              {exchangeData?.query.to}
            </h2>
          </div>
        )}
      </Container>
    </div>
  );
}
