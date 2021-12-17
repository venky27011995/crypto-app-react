import React,{ useState, useEffect } from 'react'
import  millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Input, Row, Col,Image} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10:100;
    const {data:cryptosList, isLoading} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin)=>(
            coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        ));
        setCryptos(filteredData)

    }, [searchTerm, cryptosList])

    if(isLoading) return 'Loading...'
    return (
        <>
        <div>
            {!simplified && (<Input 
                placeholder="Search Cryptocurrency"
                onChange={(e)=>setSearchTerm(e.target.value)}
                style={{marginBottom:'15px', height:'40px'}}
                />)}
                
        </div>
          <Row gutter={[32,32]} className="crypto-card-container">
            {
                cryptos?.map((currency)=>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link key={currency.id} to={`/crypto/${currency.id}`}>
                            <Card
                            title={`${currency.rank}. ${currency.name}`}
                            extra={
                            <img className="crypto-image" 
                            src={currency.iconUrl} 
                            style={{width:'35px',height:'35px'}}
                            alt={currency.name}
                            />}
                            hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))
            }
          </Row>
        </>
    )
}

export default Cryptocurrencies;