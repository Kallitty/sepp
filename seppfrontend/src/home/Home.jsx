import React from 'react'

// import Exam from './Exam'
import { Brand, CTA, Navbar } from '../components'

import { Blog, Features, Footer, Header, Possibility } from '../containers'
import './home.css'
import './index.css'

const Home = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
      </div>
      <Brand />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  )
}

export default Home
