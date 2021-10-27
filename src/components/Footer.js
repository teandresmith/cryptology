import React from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { CopyrightOutlined } from '@ant-design/icons'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div>
          <Space>
            <Link to='/'>
              <Typography.Text strong style={{ color: '#6834b5' }}>
                Home
              </Typography.Text>
            </Link>
            <Link to='/exchanges'>
              <Typography.Text strong>Exchanges</Typography.Text>
            </Link>
            <Link to='/cryptocurrencies'>
              <Typography.Text strong>Crypto</Typography.Text>
            </Link>
            <Link to='/news'>
              <Typography.Text strong>News</Typography.Text>
            </Link>
          </Space>
        </div>
        <div>
          <Typography.Title level={5}>
            Cryptology <CopyrightOutlined style={{ color: '#6834b5' }} /> 2021
          </Typography.Title>
          <Typography.Title level={5}></Typography.Title>
        </div>
      </div>
    </>
  )
}

export default Footer
