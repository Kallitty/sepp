import React from 'react'
import './possibility.css'
import possibilityImage from '../../assets/mind.jpg'
import ScrollToTop from '../scrolltotop/Scrolltotop'
import { motion } from 'framer-motion'

const Possibility = () => {
  return (
    <div className='sepp__possibility section__padding' id='possibility'>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1 }}
        className='sepp__possibility-image'
      >
        <img src={possibilityImage} alt='possibilityImage' />
      </motion.div>
      <div className='sepp__possibility-content'>
        <motion.h4
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          Embracing the Potential of Your Mind.
        </motion.h4>
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className='gradient__text'
        >
          At SEPP, we believe in the incredible power of the human mind.
        </motion.h1>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          It's the engine that drives innovation, creativity, and progress. As
          professionals, job seekers, and students, tapping into the full
          potential of our minds is key to unlocking success in today's
          competitive world. In the fast-paced and ever-evolving landscape of
          today's professions, adaptability and continuous learning are more
          important than ever.
        </motion.p>
        <motion.h4
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1.2 }}
        >
          <ScrollToTop to='/register'>
            Ready to take the next step in your professional journey?
          </ScrollToTop>
        </motion.h4>
      </div>
    </div>
  )
}

export default Possibility
