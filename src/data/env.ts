export const env = {
  coinApiKey: process.env.REACT_APP_COIN_API_KEY,
  coinApiUrl: process.env.REACT_APP_COIN_API_URL,
};

export const coinApiHeaders = {
  "X-CoinAPI-Key": env.coinApiKey,
  "Content-Type": "application/json",
};

export const currencyId = {
  BTC: 'BTC'
}
