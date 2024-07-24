import axios from 'axios'
import React, { useState } from 'react'
import swal from 'sweetalert'
import './forgotpassword.scss'
import { Navbar } from '../../components'
import Footer from '../../containers/footer/Footer.jsx'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({}) // Clear previous errors

    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .post('http://localhost:8000/api/password/email', { email })
        .then((response) => {
          swal('Success', response.data.message, 'success')
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
          if (error.response) {
            // Client received an error response (5xx, 4xx)
            const errorData = error.response.data
            if (error.response.status === 422) {
              // Validation error
              setErrors(errorData.errors)
              swal(
                'Error',
                errorData.errors.email
                  ? errorData.errors.email[0]
                  : 'Validation Error',
                'error'
              )
            } else if (error.response.status === 429) {
              // Rate limiting error
              swal(
                'Error',
                errorData.errors.email
                  ? errorData.errors.email[0]
                  : 'Too many requests. Please wait before retrying.',
                'error'
              )
            } else {
              // General error message
              swal('Error', errorData.message, 'error')
            }
          } else if (error.request) {
            // Client never received a response, or request never left
            swal('Error', 'Network error, please try again later.', 'error')
          } else {
            // Anything else
            swal('Error', 'An unexpected error occurred.', 'error')
          }
        })
    })
  }

  return (
    <>
      <Navbar />
      <div className='sepp__forgot-password section__padding'>
        <div className='sepp__forgot-password-container'>
          <div className='sepp__forgot-password-header'>
            <h1 className='gradient__text'>Forgot Password</h1>
            <p>Enter your email to receive a password reset link.</p>
          </div>
          <div className='sepp__forgot-password-form-container'>
            <form
              onSubmit={handleSubmit}
              className='sepp__forgot-password-form'
            >
              <div className='sepp__form-group'>
                <label>Email Address</label>
                <input
                  type='email'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className='sepp__form-input'
                  required
                />
                {errors.email && (
                  <div className='sepp__form-error'>{errors.email[0]}</div>
                )}
              </div>
              <div className='sepp__form-group'>
                <button
                  type='submit'
                  className='sepp__form-button'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Password Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ForgotPassword
