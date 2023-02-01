import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useBitcoinExchangeRate,
} from "../../hooks/use-bitcoin-exchange-rate";
import { BitcoinExchangeTable } from "./components/bitcoin-exchange-table";
import { ExchangeRate } from "../../interfaces/exchange.interface";

export default function HomePage() {
  const { exchangeRatesData, loading, loaded } = useBitcoinExchangeRate();

  const exchangeTable = (data: ExchangeRate[] | null) => {
    return data && <BitcoinExchangeTable data={data} />;
  };

  return (
    <div className="pt-5">
      <Container maxWidth="lg">
        <h2>Bitcoin Exchange Rate</h2>
        {loading || !loaded ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          exchangeTable(exchangeRatesData)
        )}
      </Container>
    </div>
  );
}
