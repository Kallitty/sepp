import React, { useState } from 'react'
import './contactus.scss'
import { Navbar } from '../../components'
import Footer from '../footer/Footer'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reconfirm_email: '', // Match the frontend field
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({}) // Clear errors when typing
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    if (formData.email !== formData.reconfirm_email) {
      setErrors({ reconfirm_email: ['Emails do not match.'] })
      setIsSubmitting(false)
      return
    }

    // Prepare data for Laravel (only need one email field for storage)
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }

    axios
      .post('/api/contact', dataToSend)
      .then((res) => {
        if (res.data.status === 200) {
          setMessage(res.data.message)
          setFormData({ name: '', email: '', reconfirm_email: '', message: '' }) // Clear form
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors)
        } else {
          setMessage('An unexpected error occurred. Please try again.')
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }
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

            {message && <div className='alert alert-success'>{message}</div>}
            {/* ... */}
            <form onSubmit={handleSubmit}>
              <div className='sepp__contactus-form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <small className='text-danger'>{errors.name[0]}</small>
                )}
              </div>
              {/* Email Input */}

              <div className='sepp__contactus-form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <small className='text-danger'>{errors.email[0]}</small>
                )}
              </div>
              <div className='sepp__contactus-form-group'>
                <label htmlFor='email'>Reconfirm Email</label>
                <input
                  type='email'
                  id='reconfirm_email'
                  name='reconfirm_email'
                  required
                  value={formData.reconfirm_email}
                  onChange={handleInputChange}
                />
                {errors.reconfirm_email && (
                  <small className='text-danger'>
                    {errors.reconfirm_email[0]}
                  </small>
                )}
              </div>

              {/* Message Input */}

              <div className='sepp__contactus-form-group'>
                <label htmlFor='message'>Message</label>
                <textarea
                  id='message'
                  name='message'
                  rows='5'
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {errors.message && (
                <small className='text-danger'>{errors.message[0]}</small>
              )}

              <button
                type='submit'
                className='sepp__contactus-form-button'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
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
