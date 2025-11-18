import React from 'react'
import './contactus.scss'
import { Navbar } from '../../components'
import Footer from '../footer/Footer'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className='sepp__contactus section__padding'>
        <div className='sepp__contactus-header'>
          <h1 className='gradient__text'>Get in Touch with Us</h1>
          <div>
            We would love to hear from you. Whether you have a question about
            features, trials, pricing, need a demo, or anything else, our team
            is ready to answer all your questions.
          </div>
        </div>
        <div className='sepp__contactus-content'>
          <div className='sepp__contactus-info'>
            <div className='sepp__contactus-info-item'>
              <FaPhoneAlt className='sepp__contactus-icon' />
              <h3>Phone</h3>
              <>+123 456 7890</>
            </div>
            <div className='sepp__contactus-info-item'>
              <FaEnvelope className='sepp__contactus-icon' />
              <h3>Email</h3>
              <>support@seppedu.com</>
            </div>
            <div className='sepp__contactus-info-item'>
              <FaMapMarkerAlt className='sepp__contactus-icon' />
              <h3>Address</h3>
              <>Deane Road, Bolton BL3 5AB</>
            </div>
          </div>
          <div className='sepp__contactus-form'>
            <h2>Contact Form</h2>
            <form>
              <div className='sepp__contactus-form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' required />
              </div>
              <div className='sepp__contactus-form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' required />
              </div>
              <div className='sepp__contactus-form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  rows='5'
                  required
                ></textarea>
              </div>
              <button type='submit' className='sepp__contactus-form-button'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ContactUs
