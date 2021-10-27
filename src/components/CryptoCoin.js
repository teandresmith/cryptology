import { Card, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { useGetCryptoCoinsQuery } from '../services/cryptoAPI'
import { Link } from 'react-router-dom'

const CryptoCoin = ({ top10, searchFilter }) => {
  const simple = top10 ? 10 : 100
  const { data, isFetching } = useGetCryptoCoinsQuery()

  const [cryptoList, setCryptoList] = useState([])
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const handleCardStyling = (component) => {
    switch (component) {
      case 'card':
        if (windowSize <= 350) {
          return { fontSize: '13px' }
        } else return {}
      case 'paragraph':
        if (windowSize <= 350) {
          return { fontSize: '13px' }
        } else if (windowSize > 1440) {
          return { fontSize: '20px' }
        } else return {}
      default:
        return {}
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    if (!isFetching) {
      if (top10) setCryptoList(data?.data?.coins.slice(0, simple))
      else if (searchFilter)
        setCryptoList(
          data?.data?.coins.filter((coin) =>
            coin.name.toUpperCase().includes(searchFilter.toUpperCase())
          )
        )
      else {
        setCryptoList(data?.data?.coins)
      }
    }
  }, [top10, searchFilter, data, isFetching, simple])

  return (
    <>
      {cryptoList.length === 0 && (
        <div className='notFound'>
          <Typography.Title level={4}>
            Sorry... No Crypto found with that name
          </Typography.Title>
        </div>
      )}
      <Row gutter={[32, 32]}>
        {!isFetching &&
          cryptoList &&
          cryptoList.map((coin) => (
            <Col key={coin.slug} xs={24} sm={12} lg={6}>
              <Link to={`/cryptocurrencies/${coin.id}`}>
                <Card
                  className='card'
                  title={`${coin.rank}. ${coin.name}`}
                  extra={
                    <img
                      className='cardIcon'
                      src={coin.iconUrl}
                      alt={coin.name}
                    />
                  }
                  hoverable
                  headStyle={handleCardStyling('card')}
                >
                  <Typography.Paragraph style={handleCardStyling('paragraph')}>
                    Symbol: {coin.symbol}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={handleCardStyling('paragraph')}>
                    Price: ${millify(coin.price)}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={handleCardStyling('paragraph')}>
                    Market Cap: {millify(coin.marketCap)}
                  </Typography.Paragraph>
                  <Typography.Paragraph style={handleCardStyling('paragraph')}>
                    Daily Change: {coin.change}%
                  </Typography.Paragraph>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default CryptoCoin
