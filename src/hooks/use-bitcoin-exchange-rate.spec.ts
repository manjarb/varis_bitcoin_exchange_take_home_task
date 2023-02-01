import { renderHook } from "@testing-library/react";
import { useBitcoinExchangeRate } from "./use-bitcoin-exchange-rate";
import * as useAxiosGet from "./use-axios-get";

const mockAxios = {
  data: {
    base: "BTC",
    date: "2023-02-01",
    rates: {
      BDT: 2463981.361702,
      BGN: 41716.468085,
      BHD: 8728.957447,
    },
  },
  loading: false,
  loaded: true,
  fetchData: jest.fn(),
};

const mockRatesResult = [
  { rate: 2463981.361702, symbol: "BDT" },
  { rate: 41716.468085, symbol: "BGN" },
  { rate: 8728.957447, symbol: "BHD" },
];

describe("useBitcoinExchangeRate", () => {
  test("Return correct Default Value", () => {
    jest.spyOn(useAxiosGet, "useAxiosGet").mockReturnValue(mockAxios as any);
    const { result } = renderHook(() => useBitcoinExchangeRate());

    expect(result.current.loading).toEqual(mockAxios.loading);
    expect(result.current.loaded).toEqual(mockAxios.loaded);
    expect(result.current.baseExchangeRateData).toStrictEqual(mockAxios.data);
    expect(result.current.exchangeRatesData).toStrictEqual(mockRatesResult);
  });
});
