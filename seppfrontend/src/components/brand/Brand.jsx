import React from 'react'
import { google, slack, atlassian, dropbox, shopify } from './imports.js'
import './brand.css'
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

const Brand = () => {
  return (
    <div className='sepp__brand section__padding'>
      <div></div>
      <motion.div
        variants={iconVariants(2.5)}
        initial='initial'
        animate='animate'
      >
        <img src={google} alt='google' />
      </motion.div>
      <motion.div
        variants={iconVariants(5)}
        initial='initial'
        animate='animate'
      >
        <img src={slack} alt='slack' />
      </motion.div>
      <motion.div
        variants={iconVariants(3)}
        initial='initial'
        animate='animate'
      >
        <img src={atlassian} alt='atlassian' />
      </motion.div>
      <motion.div
        variants={iconVariants(3.5)}
        initial='initial'
        animate='animate'
      >
        <img src={dropbox} alt='dropbox' />
      </motion.div>
      <motion.div
        variants={iconVariants(2)}
        initial='initial'
        animate='animate'
      >
        <img src={shopify} alt='shopify' />
      </motion.div>
    </div>
  )
}

export default Brand
