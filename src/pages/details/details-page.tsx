import Container from "@mui/material/Container";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBitcoinExchangeRatePair } from "../../hooks/use-bitcoin-exchange-rate-single";

export default function DetailsPage() {
  let { assetId } = useParams();
  const { data } = useBitcoinExchangeRatePair(assetId);

  useEffect(() => {
    console.log(data, " :data");
  }, [data]);

  return (
    <div className="pt-5">
      <Container maxWidth="lg">Detail</Container>
    </div>
  );
}
