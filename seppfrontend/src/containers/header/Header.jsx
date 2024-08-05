import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './header.css'
import visited from '../../assets/visited.png'
import vrexam from '../../assets/vrexam.jpg'
import { motion } from 'framer-motion'

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, delay: delay } },
})

const Header = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/register', { state: { email } })
  }

  return (
    <div className='sepp__header section__padding' id='home'>
      <div className='sepp__header-content'>
        <motion.h1
          variants={container(0)}
          initial='hidden'
          animate='visible'
          className='gradient__text'
        >
          Best Guide to Succeed in Professional and Scholarship Exams...
        </motion.h1>
        <motion.p variants={container(0.5)} initial='hidden' animate='visible'>
          Welcome to the ultimate destination for mastering professional and
          scholarship exams. Whether you're aiming for that dream job, pursuing
          higher education opportunities, or striving for academic excellence,
          our comprehensive guide and practice questions are designed to equip
          you with the knowledge, strategies, and confidence needed to excel.
        </motion.p>
        <motion.div
          variants={container(1)}
          initial='hidden'
          animate='visible'
          className='sepp__header-content__input'
        >
          <input
            type='email'
            placeholder='Your Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='button' onClick={handleGetStarted}>
            Get Started
          </button>
        </motion.div>
        <motion.div
          variants={container(1.2)}
          initial='hidden'
          animate='visible'
          className='sepp__header-content__people'
        >
          <img src={visited} alt='visitors' />
          <p> 32,448 people visited in the last 7 days</p>
        </motion.div>
      </div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className='sepp__header-image'
      >
        <img src={vrexam} alt='vrexam' />
      </motion.div>
    </div>
  )
}

export default Header
