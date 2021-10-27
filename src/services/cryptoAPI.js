import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoAPIHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_CRYPTO_API_KEY,
}

const baseURL = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: cryptoAPIHeaders })

export const cryptoAPI = createApi({
  reducerPath: 'cryptoAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptoCoins: builder.query({
      query: () => createRequest('/coins'),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinID) => createRequest(`/coin/${coinID}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinID, timePeriod }) =>
        createRequest(`/coin/${coinID}/history/${timePeriod}`),
    }),
  }),
})

export const {
  useGetCryptoCoinsQuery,
  useGetExchangesQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoAPI
