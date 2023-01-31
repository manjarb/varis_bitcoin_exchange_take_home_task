import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useBitcoinExchangeRate } from "../../hooks/use-bitcoin-exchange-rate";
import { BitcoinExchangeTable } from "./components/bitcoin-exchange-table";

export default function HomePage() {
  const { data } = useBitcoinExchangeRate();

  useEffect(() => {
    console.log(data, " :data");
  }, [data]);

  return (
    <div className="pt-5">
      <Container maxWidth="lg">
        {data && <BitcoinExchangeTable data={data?.rates}/>}
      </Container>
    </div>
  );
}
