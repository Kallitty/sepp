import React from 'react'
import './footer.css'
import seppFooter from '../../assets/cutoutsepp.png'
import ScrollToTop from '../scrolltotop/Scrolltotop'
import { motion } from 'framer-motion'

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
})

const Footer = () => {
  return (
    <div className='sepp__footer section__padding'>
      <div className='sepp__footer-heading'>
        <motion.h1
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          className='gradient__text'
        >
          Are you ready to embrace the future ahead of the curve?
        </motion.h1>
      </div>
      <ScrollToTop to='/register'>
        <div className='sepp__footer-btn'>
          <motion.p
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
          >
            Be among the first to gain privileged access today.
          </motion.p>
        </div>
      </ScrollToTop>
      <div className='sepp__footer-links'>
        <motion.div
          variants={iconVariants(2.5)}
          initial='initial'
          animate='animate'
          className='sepp__footer-links_logo'
        >
          <img src={seppFooter} alt='footerlogo' />
          <p>Pioneer Your Path to Success.</p>
        </motion.div>
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
      <motion.div
        variants={iconVariants(1.5)}
        initial='initial'
        animate='animate'
        className='sepp__footer-copyright'
      >
        <p>© 2024 SEPP. All rights reserved.</p>
      </motion.div>
    </div>
  )
}

export default Footer
