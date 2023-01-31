import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { coinApiHeaders, env } from "../data/env";
import { AssetIcon } from "../interfaces/exchange.interface";
import { useAxiosGet } from "./use-axios-get";

const assetIconsAtom = atom<AssetIcon[] | null>(null);

export function useAssetIcons() {
  const url = `${env.coinApiUrl}/v1/assets/icons/32`;
  const [assetIcons, setAssetIcons] = useAtom(assetIconsAtom);

  const { data, loading, loaded, fetchData } = useAxiosGet<AssetIcon[]>(url, {
    headers: coinApiHeaders,
  });

  useEffect(() => {
    if (data) {
      setAssetIcons(data);
    }
  }, [data]);

  return {
    data: assetIcons,
    fetchData,
    loading,
    loaded,
  };
}
