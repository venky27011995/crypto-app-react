import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeader = {
    //'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    //'x-rapidapi-key': '2d63abdf94msh134964cab96febfp1875d3jsnbc4e7a5fe904',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '47fb3137e1msh3d268f1113aa3b1p1d44c6jsnf9071929ff05'
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) =>({url, headers:cryptoApiHeader});

export const cryptoApi = createApi({
    reducerPath:'cryptoApi',
    baseQuery : fetchBaseQuery({baseUrl}),
    endpoints:(builder)=>({
        getCryptos: builder.query({
            query:(count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails:builder.query({
            query:(coinId)=> createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory:builder.query({
            query:({coinId,timePeriod})=> createRequest(`/coin/${coinId}/history/${timePeriod}`)
        }),
        getExchanges: builder.query({
            query:()=> createRequest('/exchanges')
        }),
        
    })
})

export const {
    useGetCryptosQuery,
    useGetExchangesQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi

