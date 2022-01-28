import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  Col,
  Skeleton,
  Row,
  Typography,
  Select,
  Avatar,
  Statistic,
  Card,
  Button,
} from 'antd'
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../../services/cryptoAPI'
import { useGetSpecificCryptoNewsQuery } from '../../services/newsAPI'
import moment from 'moment'
import { Line } from 'react-chartjs-2'
import millify from 'millify'
import SkeletonCards from '../SkeletonCards'

import DefaultNews from '../../assets/images/defaultNews.png'

const CoinInfo = ({ match }) => {
  const coinID = match.params.id
  const history = useHistory()
  const [maxArticles, setMaxArticles] = useState(3)
  const [filter, setFilter] = useState('7d')
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const {
    data: crypto,
    isFetching: cryptoFetching,
    isLoading: cryptoLoading,
  } = useGetCryptoDetailsQuery(coinID)

  const {
    data: cryptoHistory,
    isFetching: cryptoHistoryFetching,
    isLoading: cryptoHistoryLoading,
    refetch,
  } = useGetCryptoHistoryQuery({ coinID: match.params.id, timePeriod: filter })
  const {
    data: cryptoNews,
    isFetching: cryptoNewsFetching,
    isLoading: cryptoNewsLoading,
  } = useGetSpecificCryptoNewsQuery(crypto?.data?.coin?.name)

  const labels = cryptoHistory?.data?.history.map((item) =>
    moment.unix(item.timestamp).format('l')
  )

  const datasetData = cryptoHistory?.data?.history.map((price) => price.price)
  const timeframes = ['7d', '30d', '1y', '5y']

  const handleSelectChange = (value) => {
    setFilter(value)
    refetch()
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    setMaxArticles(cryptoNews?.value.length >= 3 ? 3 : cryptoNews?.value.length)
  }, [cryptoNews])

  // CoinInfo Styles
  const setStyles = (component) => {
    switch (component) {
      case 'lineGraph':
        if (windowSize <= 600) {
          return { width: `${windowSize - 30}px` }
        } else return { width: '80%' }
      case 'button':
        return {
          backgroundColor: '#d2c2ed',
          borderColor: '#672cc5',
          color: '#4018af',
        }
      case 'title':
        return { display: 'flex', alignItems: 'center' }
      case 'logo':
        return { marginLeft: '10px' }
      case 'header':
        return { padding: '15px 10px' }
      case 'input':
        return { minWidth: 175 }
      case 'lineGraphContainer':
        return { padding: '10px', display: 'flex', justifyContent: 'center' }
      case 'lineGraphLoading':
        return { padding: '10px' }
      case 'newsTextContainer':
        return { padding: '10px' }
      case 'cardContainer':
        return { padding: '0px 10px', paddingBottom: '10px' }
      case 'card':
        return { maxWidth: `${windowSize - 30}px` }
      case 'linkText':
        return { fontSize: '22px' }
      default:
        return {}
    }
  }

  return (
    <>
      {cryptoFetching || cryptoLoading ? (
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
        <>
          <div className='buttonContainer'>
            <Button
              onClick={() => history.goBack()}
              type='primary'
              size='small'
              block={false}
              style={setStyles('button')}
            >
              Go Back
            </Button>
          </div>
          <div>
            <Row style={setStyles('header')}>
              <div>
                <Typography.Title level={1} style={setStyles('title')}>
                  {crypto?.data?.coin.name}
                  <Avatar
                    src={crypto?.data?.coin.iconUrl}
                    alt={crypto?.data?.coin.name}
                    style={setStyles('logo')}
                  />
                </Typography.Title>
              </div>
            </Row>
            <div className='priceGraphTextContainer'>
              <Row>
                <Typography.Title level={2}>Price Chart</Typography.Title>
              </Row>
              <Row>
                <Select
                  defaultValue={timeframes[0]}
                  onChange={handleSelectChange}
                  style={setStyles('input')}
                >
                  {timeframes.map((time, index) => (
                    <Select.Option key={time} value={time}>
                      {time}
                    </Select.Option>
                  ))}
                </Select>
              </Row>
            </div>

            {cryptoHistoryLoading ||
              (cryptoHistoryFetching ? (
                <Row style={setStyles('lineGraphLoading')}>
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                  <Skeleton active />
                </Row>
              ) : (
                <>
                  {labels ? console.log(labels) : console.log('no labels')}
                  <Row style={setStyles('lineGraphContainer')}>
                    <Col style={setStyles('lineGraph')}>
                      <Line
                        data={{
                          labels: labels,
                          datasets: [
                            {
                              label: 'Price in USD',
                              data: datasetData,
                              backgroundColor: '#9571cc',
                            },
                          ],
                        }}
                        options={{
                          plugins: {
                            title: {
                              display: true,
                              text: 'Coin Price History',
                            },
                            legend: {
                              display: true,
                              position: 'bottom',
                            },
                          },
                        }}
                      />
                    </Col>
                  </Row>
                </>
              ))}
            <div className='coinInfoStatsContainer'>
              <Row gutter={[32, 32]}>
                <Col xs={24} sm={14}>
                  <Typography.Title level={2}>
                    {crypto?.data?.coin.name} Stats
                  </Typography.Title>
                  <Row gutter={[16, 16]}>
                    <Col xs={12} sm={12}>
                      <Statistic title='Rank' value={crypto?.data?.coin.rank} />
                    </Col>
                    <Col xs={12} sm={12}>
                      <Statistic
                        title='Current Price'
                        value={`$${millify(crypto?.data?.coin.price)}`}
                      />
                    </Col>
                    <Col xs={12} sm={12}>
                      <Statistic
                        title='# of Markets'
                        value={crypto?.data?.coin.numberOfMarkets}
                      />
                    </Col>
                    <Col xs={12} sm={12}>
                      <Statistic
                        title='Market Cap'
                        value={millify(crypto?.data?.coin.marketCap)}
                      />
                    </Col>

                    {/* <Col xs={12} sm={12}>
                      <Statistic
                        title='Volume'
                        value={millify(crypto?.data?.coin.24hVolume)}
                      />
                    </Col> */}

                    <Col xs={12} sm={12}>
                      <Statistic
                        title='Circulating Supply'
                        value={millify(crypto?.data?.coin.supply.circulating)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={10}>
                  <Typography.Title level={2}>
                    {crypto?.data?.coin.name} Links
                  </Typography.Title>
                  <Row gutter={[12, 12]}>
                    {crypto?.data?.coin.links.map((link, index) => (
                      <Col key={index + 1} xs={24} sm={12}>
                        <a href={link.url} target='_blank' rel='noreferrer'>
                          <Typography.Text style={setStyles('linkText')}>
                            {link.name}
                          </Typography.Text>
                        </a>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </div>
            <Row style={setStyles('newsTextContainer')}>
              <Typography.Title level={2}>
                {crypto?.data?.coin.name} News
              </Typography.Title>
            </Row>
            <Row gutter={[24, 24]} style={setStyles('cardContainer')}>
              {cryptoNewsLoading || cryptoNewsFetching ? (
                <SkeletonCards array={[1, 2, 3]} />
              ) : (
                cryptoNews?.value.slice(0, maxArticles).map((article) => (
                  <Col key={article.url} xs={24} sm={12} md={8}>
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
              )}
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default CoinInfo
