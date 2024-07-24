import React from 'react'
import './library.css'
import { Navbar } from '../../components'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import visited from '../../assets/visited.png'
import book from '../../assets/book.jpg'
import Footer from '../footer/Footer'

const Library = () => {
  return (
    <>
      <Navbar />
      <div className='sepp__library section__padding' id='home'>
        <div className='sepp__library-content'>
          <h1 className='gradient__text'>
            The Study, Exam Preparation Program Library...
          </h1>
          <p>
            At SEPP we aim to provide comprehensive resources and materials for
            students to enhance their learning experience. Our repository
            includes a wide range of study materials, guides, and references
            tailored to meet various academic needs.
          </p>
          <div className='sepp__library-content__input'>
            <span>
              <p>
                {' '}
                We've got an extensive repository of study materials and
                resources. However, to access them, you need to...{' '}
              </p>
              <Link to='/register'>
                <button type='button'> Get Started</button>
              </Link>
            </span>
          </div>
          <div className='sepp__library-content__people'>
            <img src={visited} alt='visitors' />
            <p> 32,448 people visited in the last 7 days</p>
          </div>
        </div>
        <div className='sepp__library-image'>
          <img src={book} alt='book' />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Library
