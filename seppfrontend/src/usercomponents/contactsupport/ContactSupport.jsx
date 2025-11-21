import React, { useState } from 'react'
import axios from 'axios'
import './contactsupport.scss'
import { ClipLoader } from 'react-spinners'
import { FaEnvelope } from 'react-icons/fa'

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      await axios.post('/contact-support', formData)
      setSuccess('Your message has been sent! We will get back to you shortly.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='contactSupport__container'>
      <div className='contactSupport__card'>
        <div className='contactSupport__icon'>
          <FaEnvelope />
        </div>

        <h2 className='contactSupport__title'>Contact Support</h2>
        <p className='contactSupport__subtitle'>
          Need help? Send us a message and our support team will respond
          shortly.
        </p>

        {success && <div className='contactSupport__success'>{success}</div>}
        {error && <div className='contactSupport__error'>{error}</div>}

        <form onSubmit={handleSubmit} className='contactSupport__form'>
          <div className='contactSupport__group'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='contactSupport__group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='contactSupport__group'>
            <label>Subject</label>
            <input
              type='text'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className='contactSupport__group'>
            <label>Message</label>
            <textarea
              name='message'
              rows='5'
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type='submit'
            className='contactSupport__button'
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='#fff' /> : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactSupport
