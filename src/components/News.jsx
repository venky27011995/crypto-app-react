import React,{useState, useEffect} from 'react'
import {Card, Avatar, Row, Col, Select, Typography} from 'antd'
import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi'
import {useGetCryptosQuery, useGetCryptoDetailsQuery} from '../services/cryptoApi'
import moment from 'moment'

const {Text, Title} = Typography;
const {Option} = Select

const demoImg = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = ({simplified}) => {
    const count = simplified ? 10:100;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const {data:cryptoNews, isLoading} = useGetCryptoNewsQuery({newsCategory,count: simplified ? 9 : 100});
    const {data} = useGetCryptosQuery(100)
    const [news, setNews] = useState(cryptoNews);
    useEffect(() => {
        
    }, [cryptoNews])
    if(!cryptoNews?.value) return 'Loading...';
    
    console.log(cryptoNews?.value)
    return (
        <Row gutter={[24,24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value)=>setNewsCategory(value)}
                    >
                        <Option>Cryptocurrency</Option>
                        {
                            data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name}</Option>)
                        }
                    </Select>
                </Col>
            )}
            {
                cryptoNews?.value.map((article,i)=>(
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card" key={i}>
                            <a href={article.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{article.name}</Title>
                                    <img style={{maxWidth:'200px',maxHeight:'100px'}}  src={article?.image?.thumbnail?.contentUrl || demoImg} alt="article thumbnail" />
                                </div>
                                <p>{article.description > 100 ? `{article.description.substring(0,100)}...` : article.description}</p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar 
                                            src={article.provider[0]?.image?.thumbnail?.contentUrl || demoImg} 
                                            alt="" 
                                            /> 
                                        <Text className="provider-name">{article.provider[0]?.name}</Text>
                                    </div>
                                        <Text>{moment(article.datePublished).startOf('ss').fromNow()}</Text>  
                                </div>
                            </a>
                        </Card>
                    </Col>
                    ))
            }
        </Row>
    )
}

export default News
