import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Skeleton, Typography, Select } from 'antd'
import {
  useGetCryptoNewsQuery,
  useGetSpecificCryptoNewsQuery,
} from '../../services/newsAPI'
import SkeletonCards from '../SkeletonCards'

import DefaultNews from '../../assets/images/defaultNews.png'
import { useGetCryptoCoinsQuery } from '../../services/cryptoAPI'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const News = () => {
  const [newsList, setNewsList] = useState([])
  const [filter, setFilter] = useState(null)
  const { data, isFetching } = useGetCryptoNewsQuery()

  const {
    data: crypto,
    isFetching: cryptoFetching,
    isLoading,
  } = useGetCryptoCoinsQuery()

  const {
    data: news,
    isFetching: newsFetching,
    isLoading: newsLoading,
    refetch,
  } = useGetSpecificCryptoNewsQuery(filter ?? skipToken)

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleWindowResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)
    if (!isFetching) {
      setNewsList(data?.value)
    }
    if (news) setNewsList(news?.value)
  }, [isFetching, data, news, newsFetching, isLoading])

  const handleSelectChange = (value) => {
    setFilter(value)
    refetch()
  }

  // Card Styles for Ant Design Components
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
      case 'input':
        return { minWidth: 175 }
      case 'inputContainer':
        return {
          padding: '20px 10px',
          display: 'flex',
          justifyContent: 'center',
        }
      case 'cardContainer':
        return { padding: '20px 10px' }
      case 'card':
        return { maxWidth: `${windowSize - 30}px` }
      default:
        return {}
    }
  }

  return (
    <>
      {isFetching && cryptoFetching && newsLoading ? (
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
          <div className='newsContainer'>
            <div className='newsHeaderContainer'>
              <Typography.Title level={2} style={setStyles('header')}>
                Crypto News from throughout the Globe
              </Typography.Title>
              <Typography.Title level={5} style={setStyles('subheader')}>
                See Current Events about Various Cryptocurrenices
              </Typography.Title>
            </div>
            <Row style={setStyles('inputContainer')}>
              <Select
                defaultValue={''}
                onChange={handleSelectChange}
                style={setStyles('input')}
              >
                {crypto?.data?.coins.map((coin) => (
                  <Select.Option key={coin.id} value={coin.name}>
                    {coin.name}
                  </Select.Option>
                ))}
              </Select>
            </Row>
            <Row gutter={[24, 24]} style={setStyles('cardContainer')}>
              {isLoading || newsFetching || newsLoading ? (
                <div style={{ padding: '10px' }}>
                  <Row gutter={[32, 32]}>{<SkeletonCards />}</Row>
                </div>
              ) : (
                newsList.map((article, index) => (
                  <Col key={index} xs={24} sm={12} md={12} xl={6}>
                    <a href={article.url} target='_blank' rel='noreferrer'>
                      <Card style={setStyles('card')} hoverable>
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

export default News
