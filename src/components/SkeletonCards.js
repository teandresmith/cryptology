import React from 'react'
import { Skeleton, Space, Col } from 'antd'

const SkeletonCards = ({ array }) => {
  const skellyArray = array ? array : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const setStyles = (component) => {
    switch (component) {
      case 'space':
        return { display: 'flex', justifyContent: 'space-between' }
      case 'skeletonCardTitle':
        return { width: 100, height: 22 }
      case 'skeletonCardContent':
        return { width: 200, height: 16 }
      default:
        return {}
    }
  }
  return (
    <>
      {skellyArray.map((index) => (
        <Col key={index} xs={24} sm={12} lg={6}>
          <Space direction='vertical'>
            <div>
              <Space style={setStyles('space')}>
                <Skeleton.Input
                  style={setStyles('skeletonCardTitle')}
                  active
                  size='default'
                />
                <Skeleton.Avatar />
              </Space>
            </div>
            <Space direction='vertical'>
              <Skeleton.Input
                style={setStyles('skeletonCardContent')}
                active
                size='default'
              />
              <Skeleton.Input
                style={setStyles('skeletonCardContent')}
                active
                size='default'
              />
              <Skeleton.Input
                style={setStyles('skeletonCardContent')}
                active
                size='default'
              />
            </Space>
          </Space>
        </Col>
      ))}
    </>
  )
}

export default SkeletonCards
