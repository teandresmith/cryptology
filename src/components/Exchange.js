import React, { useEffect, useState } from 'react'
import { useGetExchangesQuery } from '../services/cryptoAPI'
import { Row, Col, Card, Avatar, Typography } from 'antd'
import HTMLReactParser from 'html-react-parser'
import { Link } from 'react-router-dom'

const Exchange = ({ top5, searchFilter, withDescription }) => {
  const simplified = top5 ? 5 : 100
  const [exchangeList, setExchangeList] = useState([])
  const { data, isFetching } = useGetExchangesQuery()

  useEffect(() => {
    if (!isFetching) {
      if (top5) setExchangeList(data?.data?.exchanges.slice(0, simplified))
      else if (searchFilter) {
        setExchangeList(
          data?.data?.exchanges.filter((exchange) =>
            exchange.name.toUpperCase().includes(searchFilter.toUpperCase())
          )
        )
      } else {
        setExchangeList(data?.data?.exchanges)
      }
    }
  }, [top5, isFetching, simplified, data, searchFilter])

  return (
    <>
      {withDescription ? (
        <ExchangeWithDetails searchFilter={searchFilter} />
      ) : (
        <Row gutter={[32, 32]}>
          {!isFetching &&
            exchangeList &&
            exchangeList.map((exchange) => (
              <Col key={exchange.id} xs={24} sm={12} lg={6}>
                <a href={exchange.websiteUrl} target='_blank' rel='noreferrer'>
                  <Card hoverable>
                    <Card.Meta
                      title={exchange.name}
                      avatar={<Avatar src={exchange.iconUrl} />}
                    />
                  </Card>
                </a>
              </Col>
            ))}
        </Row>
      )}
    </>
  )
}

const ExchangeWithDetails = ({ searchFilter }) => {
  const [exchangeList, setExchangeList] = useState([])
  const { data, isFetching } = useGetExchangesQuery()

  const ltrim = (str) => {
    if (!str) return str

    str = str.replace('<p>&nbsp;</p>\n\n', '')
    str = str.replace(/<strong>|<\/strong>/g, '')
    return `<div>${str}</div>`
  }

  useEffect(() => {
    if (!isFetching) {
      if (searchFilter) {
        setExchangeList(
          data?.data?.exchanges.filter((exchange) =>
            exchange.name.toUpperCase().includes(searchFilter.toUpperCase())
          )
        )
      } else {
        setExchangeList(data?.data?.exchanges)
      }
    }
  }, [isFetching, searchFilter, data])

  return (
    <>
      {exchangeList.length === 0 && (
        <div className='notFound'>
          <Typography.Title level={4}>
            Sorry... No Exchange found with that name
          </Typography.Title>
        </div>
      )}
      <Row gutter={[32, 32]}>
        {!isFetching &&
          exchangeList &&
          exchangeList.map((exchange) => (
            <Col key={exchange.id} xs={24} sm={12} lg={6}>
              <Card
                hoverable
                title={
                  <a
                    className='exchangeName'
                    href={exchange.websiteUrl}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {exchange.name}
                  </a>
                }
                extra={
                  <img
                    style={{ height: '20px' }}
                    src={exchange.iconUrl}
                    alt={exchange.name}
                  />
                }
              >
                <Typography.Paragraph
                  ellipsis={true ? { rows: 5, symbol: 'See More' } : false}
                >
                  {HTMLReactParser(
                    ltrim(exchange.description) || 'No Description Provided...'
                  )}
                </Typography.Paragraph>
                {exchange.description !== null && (
                  <Link to={`/exchanges/${exchange.id}?name=${exchange.name}`}>
                    Read More...
                  </Link>
                )}
              </Card>
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Exchange
