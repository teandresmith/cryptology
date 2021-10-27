import React, { useEffect, useState } from 'react'
import { Col, Input, Row, Typography, Skeleton } from 'antd'
import CryptoCoin from '../CryptoCoin'
import SkeletonCards from '../SkeletonCards'
import { useGetCryptoCoinsQuery } from '../../services/cryptoAPI'

const Cryptocurrencies = () => {
  const [filter, setFilter] = useState('')
  const { isFetching } = useGetCryptoCoinsQuery()
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const setStyles = (component) => {
    switch (component) {
      case 'header':
        if (windowSize <= 320) {
          return { fontSize: '24px' }
        } else return {}
      case 'subheader':
        if (windowSize <= 600) {
          return { fontSize: '16px', marginTop: -10, color: '#7f52c0' }
        } else return { marginTop: -10, color: '#7f52c0' }
      case 'inputContainer':
        return { display: 'flex', justifyContent: 'center' }
      default:
        return {}
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
  }, [])

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
          <div className='searchPageContainer'>
            <Typography.Title level={2} style={setStyles('header')}>
              Explore Cryptocurrencies
            </Typography.Title>
            <Typography.Title level={5} style={setStyles('subheader')}>
              A digital, alternative choice to Fiat
            </Typography.Title>
          </div>
          <Row style={setStyles('inputContainer')}>
            <Col xs={18} sm={10}>
              <Input.Search
                onChange={(e) => setFilter(e.target.value)}
                placeholder='Enter Cryptocurrency Name'
              />
            </Col>
          </Row>
          <div className='cardContainer'>
            <CryptoCoin searchFilter={filter} />
          </div>
        </>
      )}
    </>
  )
}

export default Cryptocurrencies
