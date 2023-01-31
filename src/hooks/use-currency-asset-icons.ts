import { coinApiHeaders, env } from "../data/env";
import { AssetIcon } from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

export function useCurrencyAssetIcons(iconSize = 10) {
  const url = `${env.coinApiUrl}/v1/assets/icons/${iconSize}`;
  const { data } = useAxiosGet<AssetIcon[]>(url, {
    headers: coinApiHeaders,
  });

  return {
    data
  }
}
