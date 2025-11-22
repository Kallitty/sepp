import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaQuestionCircle } from 'react-icons/fa'
import './faqs.scss'

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const faqItems = [
    {
      question: 'How do I update my profile information?',
      answer:
        "Go to the 'Profile' page from the navigation menu. Update your details and click 'Save Changes'.",
    },
    {
      question: 'Where can I find quizzes and job prep materials?',
      answer:
        'You can access all quizzes and job prep content from the dashboard.',
    },
    {
      question: 'How do I view my quiz results?',
      answer:
        "Go to 'My Report Card' or the dashboard to view past attempts and performance.",
    },
    {
      question: 'How do I contact support?',
      answer:
        "Use the 'Help & Support' page to send a message. Admin will reply via email.",
    },
    {
      question: 'Can I change my password?',
      answer: "Yes. Visit 'Settings' → 'Change Password'.",
    },
    {
      question: 'I’m not receiving emails, what should I do?',
      answer:
        'Check spam. If still missing, update your email or contact support.',
    },
    {
      question: 'How do I log out?',
      answer: "Open the sidebar menu, check beneath and click 'Logout'.",
    },
  ]

  return (
    <div className='faq__container'>
      <motion.div
        className='faq__title-wrapper'
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
      >
        <FaQuestionCircle className='faq__title-icon' />
        <h1 className='faq__title'>Frequently Asked Questions</h1>
      </motion.div>

      <div className='faq__list'>
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            className={`faq__item ${activeIndex === index ? 'active' : ''}`}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <button
              className='faq__question'
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
            >
              <span>{item.question}</span>

              <motion.span
                className='faq__icon'
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.25 }}
              >
                +
              </motion.span>
            </button>

            <motion.div
              className='faq__answer'
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: activeIndex === index ? 'auto' : 0,
                opacity: activeIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
            >
              <p>{item.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FAQS
