import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './faq.scss'
import Footer from '../footer/Footer'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'What is SEPP and what does it offer?',
      answer:
        'SEPP is a comprehensive online platform designed to prepare candidates for successful employment. We offer resources, tools, and expert guidance to help you navigate the job search process with confidence.',
    },
    {
      question: 'How do I create an account?',
      answer:
        "Click on the 'Register' button at the top right corner of the page, fill in your details, confirm that you got a welcome mail. Come back and click on login at the top right corner, go ahead to explore the quiz and other sections on the platform.",
    },
    {
      question: 'How can I reset my password?',
      answer:
        "Click on 'Forgot Password' on the login page, enter your registered email address, and follow the instructions sent to your email.",
    },
    {
      question: 'Is there a cost to use SEPP?',
      answer:
        'SEPP offers a completely free content. Basic resources are available for free and advanced features are also free, personalized coaching might require a subscription.',
    },
    {
      question: 'Where can I find job interview preparation materials?',
      answer:
        "All interview preparation materials are available in our 'Job' section, categorized by industry and job type for easy navigation.",
    },

    {
      question: 'Do you offer enterprise solutions?',
      answer:
        'Yes, we provide customized solutions for organizations. Contact our sales team for more information about our enterprise packages.',
    },
  ]

  return (
    <>
      <div className='sepp__faq section__padding' id='faq'>
        <div className='sepp__faq-heading'>
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className='gradient__text'
          >
            Frequently Asked Questions
          </motion.h1>
        </div>

        <div className='sepp__faq-container'>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className={`sepp__faq-item ${
                activeIndex === index ? 'active' : ''
              }`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                className='sepp__faq-question'
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <motion.span
                  className='sepp__faq-icon'
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <motion.div
                className='sepp__faq-answer'
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <p>{item.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FAQ
