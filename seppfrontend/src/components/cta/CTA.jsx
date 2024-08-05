import React from 'react'
import './cta.css'
import ScrollToTop from '../../containers/scrolltotop/Scrolltotop'
import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <div className='sepp__cta'>
      <div className='sepp__cta-content'>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          You got here, You've got this! Your search for knowledge is
          commendable.
        </motion.p>
        <motion.h3
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          Your success story awaits—let's make it happen together.
        </motion.h3>
      </div>
      <ScrollToTop to='/register'>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className='sepp__cta-btn'
        >
          <button type='button'>Get Started</button>
        </motion.div>
      </ScrollToTop>
    </div>
  )
}

export default CTA
