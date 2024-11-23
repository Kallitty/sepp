import React from 'react'
import { Navbar } from './components'
import Footer from './containers/footer/Footer'
import Routes from './routes/router'

const App = () => (
  <div className='App'>
    <Navbar />
    <Routes />
    <Footer />
  </div>
)
//comment
export default App
