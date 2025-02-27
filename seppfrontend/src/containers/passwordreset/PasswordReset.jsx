import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import './passwordreset.scss'
import { Navbar } from '../../components'
import Footer from '../footer/Footer.jsx'

const PasswordReset = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [passwordInput, setPasswordInput] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    error_list: {},
  })

  const handleInput = (e) => {
    e.persist()
    setPasswordInput({ ...passwordInput, [e.target.name]: e.target.value })
  }

  const resetSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      email: passwordInput.email,
      password: passwordInput.password,
      password_confirmation: passwordInput.password_confirmation,
      token: token,
    }

    axios.get('/sanctum/csrf-cookie').then(() => {
      axios
        .post('/password/reset', data)
        .then((res) => {
          setLoading(false)
          if (res.status === 200) {
            swal('Success', res.data.message, 'success')
            navigate('/login')
          } else {
            setPasswordInput({
              ...passwordInput,
              error_list: res.data.validation_errors,
            })
          }
        })
        .catch((error) => {
          setLoading(false)
          console.error(
            'There was an error with the password reset request!',
            error
          )
          if (error.response) {
            if (error.response.data.errors) {
              setPasswordInput({
                ...passwordInput,
                error_list: error.response.data.errors,
              })
              swal(
                'Error',
                Object.values(error.response.data.errors).flat().join(', '),
                'error'
              )
            } else {
              swal('Error', error.response.data.message, 'error')
            }
          } else if (error.request) {
            swal('Error', 'No response received from the server.', 'error')
          } else {
            swal(
              'Error',
              'An error occurred while setting up the request.',
              'error'
            )
          }
        })
    })
  }

  return (
    <>
      <Navbar />
      <div className='sepp__reset-password section__padding'>
        <div className='sepp__reset-password-container'>
          <div className='sepp__reset-password-header'>
            <h1 className='gradient__text'>Reset Password</h1>
            <p>Enter your email and new password to reset your password.</p>
          </div>
          <div className='sepp__reset-password-form-container'>
            <form onSubmit={resetSubmit} className='sepp__reset-password-form'>
              <div className='sepp__form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  onChange={handleInput}
                  value={passwordInput.email}
                  className='sepp__form-input'
                />
                <span className='sepp__form-error'>
                  {passwordInput.error_list.email}
                </span>
              </div>
              <div className='sepp__form-group'>
                <label>New Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={handleInput}
                  value={passwordInput.password}
                  className='sepp__form-input'
                />
                <span className='sepp__form-error'>
                  {passwordInput.error_list.password}
                </span>
              </div>
              <div className='sepp__form-group'>
                <label>Confirm Password</label>
                <input
                  type='password'
                  name='password_confirmation'
                  onChange={handleInput}
                  value={passwordInput.password_confirmation}
                  className='sepp__form-input'
                />
                <span className='sepp__form-error'>
                  {passwordInput.error_list.password_confirmation}
                </span>
              </div>
              <div className='sepp__form-group'>
                <button
                  type='submit'
                  className='sepp__form-button'
                  disabled={loading}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
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

export default PasswordReset
