import { coinApiHeaders, env } from "../data/env";
import { useAxiosGet } from "./use-axios-get";

export function useCurrencyAssetIcons(iconSize = 10) {
  const url = `${env.coinApiUrl}/v1/assets/icons/${iconSize}`;
  const { data } = useAxiosGet(url, {
    headers: coinApiHeaders,
  });

  return {
    data
  }
}
