import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import HomePage from "./home-page";
import * as useBitcoinExchangeRate from '../../hooks/use-bitcoin-exchange-rate';

const mockBitcoinExchangeRate = {
  exchangeRatesData: [],
  baseExchangeRateData: [],
  loading: false,
  loaded: true,
  latestFetchDateTime: "02 Feb 2023 02:37:04",
  fetchData: jest.fn(),
};

describe("Home Page", () => {
  it("Success Load Page and Display correct Data", () => {
    jest
      .spyOn(useBitcoinExchangeRate, "useBitcoinExchangeRate")
      .mockReturnValue(mockBitcoinExchangeRate as any);

    render(<HomePage />);

    expect(screen.getByText("Bitcoin Exchange Rate")).toBeTruthy();
    expect(screen.getByTestId("latest-fetch-time")).toHaveTextContent(mockBitcoinExchangeRate.latestFetchDateTime);
  });

  it('Show Loading', () => {
    jest.spyOn(useBitcoinExchangeRate, "useBitcoinExchangeRate").mockReturnValueOnce({
      ...mockBitcoinExchangeRate,
      loading: true,
      loaded: false,
    } as any);

    render(<HomePage />);

    expect(screen.getByTestId('progress')).toBeInTheDocument();
  })
});
