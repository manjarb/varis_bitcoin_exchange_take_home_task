import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useBitcoinExchangeRate } from "../../hooks/use-bitcoin-exchange-rate";
import { BitcoinExchangeTable } from "./components/bitcoin-exchange-table.component";
import { ExchangeRate } from "../../interfaces/exchange.interface";
import { useEffect } from "react";

export default function HomePage() {
  const { exchangeRatesData, loading, loaded, latestFetchDateTime, fetchData } =
    useBitcoinExchangeRate();

  const exchangeTable = (data: ExchangeRate[] | null) => {
    return data && <BitcoinExchangeTable data={data} />;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-5">
      <Container maxWidth="lg">
        <div>
          <h2 className="inline-block mr-5">Bitcoin Exchange Rate</h2>
          Last update{" "}
          <strong data-testid="latest-fetch-time">{latestFetchDateTime}</strong>
        </div>
        {loading && !loaded && (
          <div className="text-center" data-testid="progress">
            <CircularProgress />
          </div>
        )}
        {loaded && exchangeTable(exchangeRatesData)}
      </Container>
    </div>
  );
}
