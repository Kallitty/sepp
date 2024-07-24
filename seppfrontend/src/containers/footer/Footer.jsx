import React from 'react'
import './footer.css'
import seppFooter from '../../assets/cutoutsepp.png'
import ScrollToTop from '../scrolltotop/Scrolltotop'

const Footer = () => {
  return (
    <div className='sepp__footer section__padding'>
      <div className='sepp__footer-heading'>
        <h1 className='gradient__text'>
          Are you ready to embrace the future ahead of the curve?
        </h1>
      </div>
      <ScrollToTop to='/register'>
        <div className='sepp__footer-btn'>
          <p>Be among the first to gain privileged access today.</p>
        </div>
      </ScrollToTop>
      <div className='sepp__footer-links'>
        <div className='sepp__footer-links_logo'>
          <img src={seppFooter} alt='footerlogo' />
          <p>Pioneer Your Path to Success.</p>
        </div>
        <div className='sepp__footer-links_div'>
          <h4>Company</h4>
          <p>
            <ScrollToTop to='/terms'>Terms & Conditions</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/privacy'>Privacy Policy</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/faqs'>FAQs</ScrollToTop>
          </p>
        </div>
        <div className='sepp__footer-links_div'>
          <h4>Career Counseling</h4>
          <p>
            <ScrollToTop to='/resources'>Study Resources</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/tests'>Practice Tests</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/tutoring'>Tutoring Services</ScrollToTop>
          </p>
        </div>
        <div className='sepp__footer-links_div'>
          <h4>Community Support</h4>
          <p>
            <ScrollToTop to='/forums'>Discussion Forums</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/charity'>Charity Events</ScrollToTop>
          </p>
          <p>
            <ScrollToTop to='/networking'>Networking Events</ScrollToTop>
          </p>
        </div>
      </div>
      <div className='sepp__footer-copyright'>
        <p>© 2024 SEPP. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
