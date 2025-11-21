import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
        "Go to the 'Profile' page from the navigation menu. You can update your name, email, or other personal details and click 'Save Changes'.",
    },
    {
      question: 'Where can I find the quizzes and job preparation materials?',
      answer:
        'Once logged in, you can access all available quizzes and job preparation content from the dashboard. Simply select a category to begin.',
    },
    {
      question: 'How do I view my quiz results?',
      answer:
        "You can view all your previous quiz attempts in the 'My Report card' or 'Dashboard' section. Your scores, attempts, and progress will be listed there.",
    },
    {
      question: 'How do I contact support if I need help?',
      answer:
        "You can send us a message through the 'Help & Support' page. Fill out the contact form and an admin will reply to your email.",
    },
    {
      question: 'Can I change my password while logged in?',
      answer:
        "Yes. Go to the 'Settings' page and click on 'Change Password'. Enter your current password and your new password to update it.",
    },
    {
      question: 'What should I do if I’m not receiving platform emails?',
      answer:
        'Check your spam or junk folder first. If the emails are still missing, update your email address in your profile or contact support for assistance.',
    },
    {
      question: 'How do I log out of my account?',
      answer:
        "Click on your user icon or the menu toggle in the top navigation and select 'Logout'. This will safely end your session.",
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
      {/* <Footer /> */}
    </>
  )
}

export default FAQS
