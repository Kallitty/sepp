import React from 'react'
import './possibility.css'
import possibilityImage from '../../assets/mind.jpg'
import ScrollToTop from '../scrolltotop/Scrolltotop'

const Possibility = () => {
  return (
    <div className='sepp__possibility section__padding' id='possibility'>
      <div className='sepp__possibility-image'>
        <img src={possibilityImage} alt='possibilityImage' />
      </div>
      <div className='sepp__possibility-content'>
        <h4>Embracing the Potential of Your Mind.</h4>
        <h1 className='gradient__text'>
          At SEPP, we believe in the incredible power of the human mind.
        </h1>
        <p>
          It's the engine that drives innovation, creativity, and progress. As
          professionals, job seekers, and students, tapping into the full
          potential of our minds is key to unlocking success in today's
          competitive world. In the fast-paced and ever-evolving landscape of
          today's professions, adaptability and continuous learning are more
          important than ever.
        </p>
        <h4>
          <ScrollToTop to='/register'>
            Ready to take the next step in your professional journey?
          </ScrollToTop>
        </h4>
      </div>
    </div>
  )
}

export default Possibility
