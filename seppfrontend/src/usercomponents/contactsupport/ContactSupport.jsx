import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './contactsupport.scss'
import { ClipLoader } from 'react-spinners'
import { FaEnvelope } from 'react-icons/fa'

const ContactSupport = () => {
  // State for form data, including pre-filled user info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // State for loading/error indicators
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true) // New state for initial data loading
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // 1. Fetch User Data on Component Mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simulate fetching authenticated user data (replace with your actual endpoint)
        const response = {
          data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
          },
        } // await axios.get('/user/me');

        setFormData((prevFormData) => ({
          ...prevFormData,
          name: response.data.name,
          email: response.data.email,
        }))
      } catch (err) {
        console.error('Failed to fetch user data:', err)
        // Optionally set an error here if data is critical
      } finally {
        setDataLoading(false)
      }
    }

    fetchUserData()
  }, []) // Empty dependency array ensures it runs once on mount

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      // API request to submit the form
      await axios.post('/contact-support', formData)
      setSuccess('Your message has been sent! We will get back to you shortly.')

      // Keep name/email but clear subject/message on success
      setFormData((prevFormData) => ({
        ...prevFormData,
        subject: '',
        message: '',
      }))
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (dataLoading) {
    return (
      <div className='contactSupport__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
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
              disabled // Disable to prevent accidental changes, but can be removed
              required
              className='contactSupport__input--disabled'
            />
          </div>

          <div className='contactSupport__group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              disabled // Disable to prevent accidental changes
              required
              className='contactSupport__input--disabled'
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
