import { Typography, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'

const PageNotFound = () => {
  const history = useHistory()
  const setStyles = (component) => {
    switch (component) {
      case 'title':
        return { textAlign: 'center' }
      case 'text':
        return { textAlign: 'center', marginTop: '-10px' }
      case 'button':
        return {
          width: 'fit-content',
        }
      default:
        return {}
    }
  }
  return (
    <>
      <div className='pageNotFoundContainer'>
        <Typography.Title level={1} style={setStyles('title')}>
          404 Not Found
        </Typography.Title>
        <Typography.Title level={5} style={setStyles('text')}>
          Whoops something went wrong. The page you are looking for cannot be
          found
        </Typography.Title>
        <div className='pageNotFoundButtonContainer'>
          <Button onClick={() => history.push('/')} style={setStyles('button')}>
            Return to Home
          </Button>
        </div>
      </div>
    </>
  )
}

export default PageNotFound
