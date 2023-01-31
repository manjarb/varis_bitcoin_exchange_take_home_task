import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import {
  BaseExchangeRate,
  useBitcoinExchangeRate,
} from "../../hooks/use-bitcoin-exchange-rate";
import { BitcoinExchangeTable } from "./components/bitcoin-exchange-table";

export default function HomePage() {
  const { data, loading } = useBitcoinExchangeRate();

  const exchangeTable = (data: BaseExchangeRate | null) => {
    return data && <BitcoinExchangeTable data={data?.rates} />;
  };

  return (
    <div className="pt-5">
      <Container maxWidth="lg">
        <h2>Bitcoin Exchange Rate</h2>
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          exchangeTable(data)
        )}
      </Container>
    </div>
  );
}
