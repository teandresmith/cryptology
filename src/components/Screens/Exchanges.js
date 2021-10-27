import React, { useState, useEffect } from 'react'
import { Col, Input, Row, Typography, Skeleton } from 'antd'
import Exchange from '../Exchange'
import SkeletonCards from '../SkeletonCards'
import { useGetExchangesQuery } from '../../services/cryptoAPI'

const Exchanges = () => {
  const [filter, setFilter] = useState('')
  const { isFetching } = useGetExchangesQuery()

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
      case 'exchangeInput':
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
              Popular Exchanges to Purchase Crypto
            </Typography.Title>
            <Typography.Title level={5} style={setStyles('subheader')}>
              Discover where to purchase deregulated currencies
            </Typography.Title>
          </div>
          <Row style={setStyles('exchangeInput')}>
            <Col xs={18} sm={10}>
              <Input.Search
                onChange={(e) => setFilter(e.target.value)}
                placeholder='Enter Exchange Name'
              />
            </Col>
          </Row>
          <div className='cardContainer'>
            <Exchange searchFilter={filter} withDescription />
          </div>
        </>
      )}
    </>
  )
}

export default Exchanges
