import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CryptoCoin from '../CryptoCoin'
import SkeletonCards from '../SkeletonCards'
import { useGetCryptoCoinsQuery } from '../../services/cryptoAPI'
import { Statistic, Row, Col, Skeleton, Typography } from 'antd'
import millify from 'millify'
import Exchange from '../Exchange'

const Home = () => {
  const { data, isFetching } = useGetCryptoCoinsQuery()

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const setStyles = (component) => {
    switch (component) {
      case 'top10Header':
        if (windowSize <= 426) {
          return {
            fontSize: '22px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }
        } else if (windowSize <= 768) {
          return {
            fontSize: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        } else if (windowSize <= 1024) {
          return {
            fontSize: '24px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        } else if (windowSize <= 1440) {
          return {
            fontSize: '36px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
        } else
          return {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
      default:
        return {}
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
  })

  return (
    <>
      {isFetching ? (
        <div className='skeleton'>
          <div className='skeletonQuad'>
            <Skeleton active />
          </div>

          <div className='skeletonSingle'>
            <Row gutter={[32, 32]}>{<SkeletonCards />}</Row>
          </div>
        </div>
      ) : (
        <>
          <div className='homeHeader'>
            <Row gutter={[32, 32]}>
              <Col xs={12}>
                <Statistic
                  title={
                    <Typography.Text>Total Cryptocurrencies</Typography.Text>
                  }
                  value={data?.data?.stats?.total}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title={<Typography.Text>Total Exchanges</Typography.Text>}
                  value={data?.data?.stats?.totalExchanges}
                />
              </Col>

              <Col xs={12}>
                <Statistic
                  title={<Typography.Text>Total Markets</Typography.Text>}
                  value={millify(data?.data?.stats?.totalMarkets)}
                />
              </Col>
              <Col xs={12}>
                <Statistic
                  title={<Typography.Text>Total Market Cap</Typography.Text>}
                  value={millify(data?.data?.stats?.totalMarketCap)}
                />
              </Col>

              <Col xs={12}>
                <Statistic
                  title={<Typography.Text>Total 24hr Volume</Typography.Text>}
                  value={millify(data?.data?.stats?.total24hVolume)}
                />
              </Col>
            </Row>
          </div>
          <div className='coins'>
            <div>
              <Typography.Title level={2} style={setStyles('top10Header')}>
                <div>Current Top 10 Cryptocurrencies in the World</div>
                <Link to='/cryptocurrencies'>
                  <div className='seeMoreLink'>See More</div>
                </Link>
              </Typography.Title>
              <Typography.Title level={2}></Typography.Title>
            </div>
            <CryptoCoin top10 />
          </div>
          <div className='exchanges'>
            <div>
              <Typography.Title level={2} style={setStyles('top10Header')}>
                <div>Current Top 5 Exchanges in the World</div>
                <Link to='/exchanges'>
                  <div className='seeMoreLink'>See More</div>
                </Link>
              </Typography.Title>
              <Typography.Title level={2}></Typography.Title>
            </div>
            <div>
              <Exchange top5 />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Home
