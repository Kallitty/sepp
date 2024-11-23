import React, { useState } from 'react'
import { Navbar } from '../../components'
import { useNavigate, Link } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
import Footer from '../footer/Footer'
import ScrollToTop from '../scrolltotop/Scrolltotop'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.scss'

function Login() {
  const navigate = useNavigate()

  const [loginInput, setLogin] = useState({
    email: '',
    password: '',
    error_list: {},
  })

  const handleInput = (e) => {
    setLogin({ ...loginInput, [e.target.name]: e.target.value })
  }

  const loginSubmit = (e) => {
    e.preventDefault()

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post('http://localhost:8000/api/login', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_username', res.data.username)
          swal('Success', res.data.message, 'success').then(() => {
            if (res.data.role === 'admin') {
              navigate('/admin/dashboard')
            } else {
              navigate('/boardoutlet')
            }
          })
        } else if (res.data.status === 401) {
          swal('Warning', res.data.message, 'warning')
        } else {
          setLogin({ ...loginInput, error_list: res.data.validation_errors })
        }
      })
    })
  }

  return (
    <>
      <Navbar />
      <div className='sepp__login' id=''>
        <div className='sepp__login-card'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='sepp__login-left_container'>
                <form className='sepp__login-form' onSubmit={loginSubmit}>
                  <header>Kindly Log in</header>
                  <div className='form-group items'>
                    <i className='fas fa-envelope'></i>
                    <input
                      className='myInput'
                      placeholder='Email'
                      type='email'
                      name='email'
                      value={loginInput.email}
                      onChange={handleInput}
                    />
                    {loginInput.error_list.email && (
                      <p>
                        <span className='text-danger'>
                          {loginInput.error_list.email}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className='form-group items'>
                    <i className='fas fa-lock'></i>
                    <input
                      className='myInput'
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={loginInput.password}
                      onChange={handleInput}
                    />
                    {loginInput.error_list.password && (
                      <p>
                        {' '}
                        <span className='text-danger'>
                          {loginInput.error_list.password}
                        </span>
                      </p>
                    )}
                  </div>

                  <input type='submit' className='button' value='Login' />
                  <div>
                    <Link
                      to='/forgot-password'
                      id='forget-password'
                      style={{ textDecoration: 'underline' }}
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className='sepp__login-signup'>
                    <button>
                      <ScrollToTop to='/register'>
                        Create an account
                      </ScrollToTop>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='sepp__login-right_container'>
                <div className='sepp__login-right_container-box'>
                  <header>Hi Seppie!</header>
                  <p>
                    That's what we call you. Are you ready to take the next step
                    in your career? Look no further than SEPP; a comprehensive
                    online resource dedicated to preparing candidates for
                    successful employment. <br />
                    At SEPP, we understand the challenges and complexities of
                    today's job market. That's why we've curated a wide range of
                    tools, resources, and expert guidance to help you navigate
                    every stage of the job search process with confidence and
                    competence.
                  </p>
                  <p>
                    <ScrollToTop to='/library'>
                      <input type='button' value='Learn More' />
                    </ScrollToTop>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
