import React from 'react'
import { useGetExchangesQuery } from '../services/cryptoApi'


const Exchanges = () => {
    const {data, isFetching} = useGetExchangesQuery();

    console.log('Exchanges:', data)
    return (
        <div>
            Exchanges
        </div>
    )
}

export default Exchanges
