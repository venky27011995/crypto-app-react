import React from 'react'
import HTMLReactParser from 'html-react-parser';
import {Row, Col,Collapse,Typography,Avatar} from 'antd'
import millify from 'millify'
import { useGetExchangesQuery } from '../services/cryptoApi'

const {Panel} = Collapse;
const {Text, Title} = Typography

const Exchanges = () => {
    const {data, isFetching} = useGetExchangesQuery();
    const exchangeList = data?.data?.exchanges
    console.log('Exchanges:', exchangeList);
    if(isFetching) return 'Loading...'
    return (
        <>
            <Row>
                <Col  span={6}>
                <Text level={5}>Exchanges</Text>
                </Col>
                <Col span={6}>
                <Text level={5}>24h Trade Volume</Text>
                </Col>
                <Col span={6}>
                <Text level={5}>Markets</Text>
                </Col>
                <Col span={6}>
                <Text level={5}>Change</Text>
                </Col>
            </Row>
            <Row>
                {exchangeList.map((exchange)=>(
                <Col span={24}>
                    <Collapse>
                        <Panel
                            key={exchange.id}
                            header={(
                            <Row key={exchange.id} span={24}>
                                <Col span={6}>
                                    <Text><strong>{exchange.rank}. </strong></Text>
                                    <Avatar src={exchange.iconUrl} className="exchange-image"  />
                                    <Text><strong>{exchange.name}</strong></Text>                               
                                </Col>
                                <Col span={6}>${millify(exchange.volume)}</Col>
                                <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                
                            </Row>
                            )}
                        >
                            {/* {HTMLReactParser(exchange.description)} */}
                            <div dangerouslySetInnerHTML={{__html:exchange.description }}></div>
                        </Panel>
                    </Collapse>
                </Col>)
                )
                }
            </Row>
        </>
    )
}

export default Exchanges
