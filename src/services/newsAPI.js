import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const newsAPIHeaders = {
  'x-bingapis-sdk': 'true',
  'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
  'x-rapidapi-key': process.env.REACT_APP_NEWS_API_KEY,
}

const baseURL = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({ url, headers: newsAPIHeaders })

export const newsAPI = createApi({
  reduerPath: 'newsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () =>
        createRequest(
          `/news/search?q=cryptocurrency&setLang=en&safeSearch=Off&textFormat=Raw&freshness=Week`
        ),
    }),
    getSpecificCryptoNews: builder.query({
      query: (coinName) =>
        createRequest(
          `/news/search?q=${coinName}+AND+crypto&setLang=en&safeSearch=Off&textFormat=Raw&freshness=Week`
        ),
    }),
  }),
})

export const { useGetCryptoNewsQuery, useGetSpecificCryptoNewsQuery } = newsAPI
