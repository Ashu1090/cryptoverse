import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://coinranking1.p.rapidapi.com";

// API Headers with Correct Structure
const cryptoApiHeaders = {
  "x-rapidapi-key": "60eb65cdccmshee4e82b7a8c3836p1ce816jsn80b0d096988f",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

// Function to attach headers to each request
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

// Define API Service with Redux Toolkit Query
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", cryptoApiHeaders["x-rapidapi-key"]);
      headers.set("x-rapidapi-host", cryptoApiHeaders["x-rapidapi-host"]);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch List of Cryptos
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    // Fetch Crypto Details
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // Fetch Crypto History
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

// Export Hooks for React Components
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
