import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Menu, Avatar } from 'antd'
import {
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  ReadOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons'

import Logo from '../assets/images/logo.png'

const { Title } = Typography

const Navbar = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth)

  const handleResize = (e) => {
    setWindowSize(window.innerWidth)
  }

  const setStyles = (component) => {
    switch (component) {
      case 'title':
        if (windowSize <= 769)
          return {
            color: '#eee6f8',
            display: 'flex',
            alignItems: 'center',
            padding: '15px 10px',
            paddingTop: '20px',
          }
        else return { color: '#eee6f8', display: 'flex', alignItems: 'center' }
      case 'logo':
        return { margin: '0px 10px', height: 40, width: 40 }
      case 'menu':
        return { backgroundColor: '#4018af', color: '#efe5fd' }
      case 'menuItem':
        return { color: '#eee6f8' }
      case 'menuLink':
        return { color: '#eee6f8' }
      case 'mobileLogo':
        return {
          fontSize: '30px',
          position: 'absolute',
          top: 15,
          right: 15,
          zIndex: 20,
        }
      default:
        return {}
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })
  return (
    <>
      {windowSize <= 768 ? (
        <MobileNav setStyles={setStyles} />
      ) : (
        <div className='nav'>
          <div className='navbarTitleContainer'>
            <Title style={setStyles('title')} level={2}>
              <Avatar style={setStyles('logo')} src={Logo} />
              Cryptology
            </Title>
          </div>

          <Menu
            mode='vertical'
            theme='dark'
            style={setStyles('menu')}
            selectable={false}
          >
            <Menu.Item
              key='home'
              icon={<HomeOutlined />}
              style={setStyles('menuItem')}
            >
              <Link to='/' style={setStyles('menuLink')}>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item
              key='Cryptocurrencies'
              icon={<MoneyCollectOutlined />}
              style={setStyles('menuItem')}
            >
              <Link to='/cryptocurrencies' style={setStyles('menuLink')}>
                Cryptocurrencies
              </Link>
            </Menu.Item>
            <Menu.Item
              key='News'
              icon={<ReadOutlined />}
              style={setStyles('menuItem')}
            >
              <Link to='/news' style={setStyles('menuLink')}>
                News
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </>
  )
}

const MobileNav = ({ setStyles }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    if (open) setOpen(false)
    else setOpen(true)
  }
  return (
    <>
      <div className='nav'>
        <div className='navbarTitleContainer'>
          <Title style={setStyles('title')} level={2}>
            <Avatar style={setStyles('logo')} src={Logo} />
            Cryptology
          </Title>
        </div>
        <div>
          {open ? (
            <CloseOutlined
              onClick={handleOpen}
              style={setStyles('mobileLogo')}
            />
          ) : (
            <MenuOutlined
              onClick={handleOpen}
              style={setStyles('mobileLogo')}
            />
          )}
        </div>

        {open && (
          <div className='mobileMenu'>
            <div className='mobileLinks'>
              <div className='mobileLinkContainer'>
                <Link
                  className='mobileLink'
                  to='/'
                  onClick={() => setOpen(false)}
                >
                  <HomeOutlined /> Home
                </Link>
              </div>
              <div className='mobileLinkContainer'>
                <Link
                  className='mobileLink'
                  to='/cryptocurrencies'
                  onClick={() => setOpen(false)}
                >
                  <MoneyCollectOutlined /> Cryptocurrencies
                </Link>
              </div>
              <div className='mobileLinkContainer'>
                <Link
                  className='mobileLink'
                  to='/news'
                  onClick={() => setOpen(false)}
                >
                  <ReadOutlined /> News
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
