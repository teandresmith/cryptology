import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import {
  Home,
  Cryptocurrencies,
  CoinInfo,
  News,
  ExchangeInfo,
  Exchanges,
  PageNotFound,
} from './components/Screens'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './App.css'

const App = () => {
  return (
    <>
      <div className='container'>
        <Router>
          <nav className='navContainer'>
            <Navbar />
          </nav>
          <main className='mainContainer'>
            <Layout style={{ minHeight: '100vh' }} className='layoutContainer'>
              <Switch>
                <Route exact path='/news' component={News} />
                <Route exact path='/exchanges' component={Exchanges} />
                <Route exact path='/exchanges/:id?' component={ExchangeInfo} />

                <Route
                  exact
                  path='/cryptocurrencies/:id'
                  component={CoinInfo}
                />
                <Route
                  exact
                  path='/cryptocurrencies'
                  component={Cryptocurrencies}
                />
                <Route exact path='/' component={Home} />
                <Route path='/' component={PageNotFound} />
              </Switch>
            </Layout>
            <footer className='footerContainer'>
              <Footer />
            </footer>
          </main>
        </Router>
        <BackTop />
      </div>
    </>
  )
}

export default App
