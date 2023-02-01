import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatDateString } from "../../helpers/date.helper";
import { useBitcoinExchangeRatePair } from "../../hooks/use-bitcoin-exchange-rate-pair";
import { useBitcoinTimeSeriesData } from "../../hooks/use-bitcoin-time-series-data";

export default function DetailsPage() {
  let { assetId } = useParams();
  const { data: exchangeData } = useBitcoinExchangeRatePair(assetId);
  const { timeSeriesRateData } = useBitcoinTimeSeriesData(assetId, 30);

  return (
    <div className="pt-5">
      <Container maxWidth="lg">
        <div>
          <h1 className="inline-block mr-3 mb-0">{assetId}</h1>
          <span>
            {exchangeData?.date
              ? formatDateString(exchangeData?.date, "dd MMMM yyyy")
              : ""}
          </span>
        </div>
        <p>
          <span className="green-text"> {exchangeData?.result} </span>
          {exchangeData?.query.to}
          <span className="ml-3 mr-3">=</span>
          {exchangeData?.query.amount} {exchangeData?.query.from}
        </p>
        <div className="mt-10">
          {timeSeriesRateData && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={timeSeriesRateData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Container>
    </div>
  );
}
