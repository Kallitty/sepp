import React from 'react'
import './cta.css'
import ScrollToTop from '../../containers/scrolltotop/Scrolltotop'

const CTA = () => {
  return (
    <div className='sepp__cta'>
      <div className='sepp__cta-content'>
        <p>
          You got here, You've got this! Your search for knowledge is
          commendable.
        </p>
        <h3>Your success story awaits—let's make it happen together.</h3>
      </div>
      <ScrollToTop to='/register'>
        <div className='sepp__cta-btn'>
          <button type='button'>Get Started</button>
        </div>
      </ScrollToTop>
    </div>
  )
}

export default CTA
