import {
  Avatar,
  Typography,
  Col,
  Row,
  Descriptions,
  Skeleton,
  Button,
  Card,
} from 'antd'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useGetExchangesQuery } from '../../services/cryptoAPI'
import { useGetSpecificCryptoNewsQuery } from '../../services/newsAPI'
import { useLocation } from 'react-router'

import SkeletonCards from '../SkeletonCards'

import DefaultNews from '../../assets/images/defaultNews.png'

const ExchangeInfo = ({ match }) => {
  const search = useLocation().search
  const name = new URLSearchParams(search).get('name')
  const { data, isFetching } = useGetExchangesQuery()
  const { data: news, isLoading } = useGetSpecificCryptoNewsQuery(name)
  const [specificExchange, setSpecificExchange] = useState([{}])
  const [specificExchangeNews, setSpecificExchangeNews] = useState([])
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const setStyles = (component) => {
    switch (component) {
      case 'exchangeLogo':
        return { marginLeft: '5px' }
      case 'descriptionContainer':
        return { padding: '0px 10px' }
      case 'button':
        return {
          backgroundColor: '#d2c2ed',
          borderColor: '#672cc5',
          color: '#4018af',
        }
      case 'descriptions':
        return { padding: '0px 20px' }
      case 'cardContainer':
        return { padding: '0px 10px', paddingBottom: '10px' }
      case 'card':
        return { maxWidth: `${windowSize - 30}px` }
      case 'noCardsProvided':
        return { padding: '0px 10px', textAlign: 'center' }
      default:
        return {}
    }
  }

  const history = useHistory()

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    if (!isFetching) {
      if (match) {
        setSpecificExchange(
          data?.data?.exchanges.filter((exchange) => {
            return exchange.id === Number(match.params.id)
          })
        )
      }
      var maxArticles = news?.value.length >= 3 ? 3 : news?.value.length
      setSpecificExchangeNews(news?.value.slice(0, maxArticles))
    }
  }, [isFetching, data, match, news])

  return (
    <>
      {!specificExchange &&
      !specificExchangeNews &&
      specificExchange.length === 0 &&
      specificExchangeNews.length === 0 ? (
        <div className='skeleton'>
          <div className='skeletonQuad'>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>

          <div className='skeletonSingle'>
            <Skeleton active />
          </div>
        </div>
      ) : (
        specificExchange.length !== 0 && (
          <>
            <div className='buttonContainer'>
              <Button
                onClick={() => history.goBack()}
                type='text'
                size='small'
                block={false}
                style={setStyles('button')}
              >
                Go Back
              </Button>
            </div>
            <div className='exchangeName'>
              <Typography.Title level={1}>
                {specificExchange[0].name}
                <Avatar
                  style={setStyles('exchangeLogo')}
                  src={specificExchange[0].iconUrl}
                />
              </Typography.Title>
            </div>
            <Row style={setStyles('descriptionContainer')}>
              <Col xs={24} sm={24} lg={14}>
                <Typography.Title level={2}>Description</Typography.Title>
                <Typography.Paragraph>
                  {HTMLReactParser(specificExchange[0].description || '')}
                </Typography.Paragraph>
              </Col>
              <Col xs={24} sm={24} lg={10}>
                <Descriptions
                  style={setStyles('descriptions')}
                  title='Exchange Details'
                  bordered={true}
                  column={1}
                >
                  <Descriptions.Item label='Rank'>
                    {specificExchange[0].rank}
                  </Descriptions.Item>
                  <Descriptions.Item label='# of Markets'>
                    {specificExchange[0].numberOfMarkets}
                  </Descriptions.Item>
                  <Descriptions.Item label='Volume'>
                    {specificExchange.length !== 0 &&
                      specificExchange[0].volume &&
                      millify(specificExchange[0].volume)}
                  </Descriptions.Item>
                  <Descriptions.Item label='Market Share'>
                    {specificExchange.length !== 0 &&
                      specificExchange[0].marketShare &&
                      millify(specificExchange[0].marketShare)}
                    %
                  </Descriptions.Item>
                  <Descriptions.Item label='Website Url'>
                    <a
                      href={specificExchange[0].websiteUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {specificExchange[0].name}
                    </a>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Row>
              <div className='newsHeader'>
                <Typography.Title level={2}>Recent News</Typography.Title>
              </div>
            </Row>
            <Row gutter={[24, 24]} style={setStyles('cardContainer')}>
              {isLoading ? (
                <SkeletonCards array={[1, 2, 3]} />
              ) : specificExchangeNews && specificExchangeNews.length !== 0 ? (
                specificExchangeNews.map((article, index) => (
                  <Col key={index} xs={24} sm={12} md={8}>
                    <a href={article.url} target='_blank' rel='noreferrer'>
                      <Card hoverable style={setStyles('card')}>
                        <Card.Meta
                          title={article.name}
                          description={article.description}
                        />
                      </Card>
                    </a>
                  </Col>
                ))
              ) : (
                <Typography.Text strong style={setStyles('noCardsProvided')}>
                  No recent articles provided
                </Typography.Text>
              )}
            </Row>
          </>
        )
      )}
    </>
  )
}

export default ExchangeInfo
