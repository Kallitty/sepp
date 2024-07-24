import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Navbar } from '../../components'
import Footer from '../footer/Footer'
import { FormInput } from '../../components'
import swal from 'sweetalert'
import ScrollToTop from '../scrolltotop/Scrolltotop'
import './signup.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function Signup() {
  const location = useLocation()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (location.state && location.state.email) {
      setValues((prevValues) => ({
        ...prevValues,
        email: location.state.email,
      }))
    }
  }, [location.state])

  const inputs = [
    {
      id: 1,
      label: 'Fullname',
      name: 'name',
      type: 'text',
      placeholder: 'Fullname',
    },
    {
      id: 2,
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email should be a valid email address',
      required: true,
    },
    {
      id: 3,
      label: 'Input Password',
      name: 'password',
      type: 'password',
      placeholder: 'Input Password',
    },
    {
      id: 4,
      label: 'Confirm Password',
      name: 'password_confirmation',
      type: 'password',
      placeholder: 'Confirm Password',
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    }

    axios.get('/sanctum/csrf-cookie').then((response) => {
      axios.post('http://localhost:8000/api/register', data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_username', res.data.username)
          swal('Success', res.data.message, 'success')
          navigate('/login')
        } else {
          setErrors(res.data.validation_errors)
        }
      })
    })
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Navbar />
      <div className='sepp__signup' id=''>
        <div className='sepp__signup-card'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='sepp__signup-left_container'>
                <form onSubmit={handleSubmit} className='sepp__signup-form'>
                  <header>Create an Account</header>
                  <div className='form-group items'>
                    {inputs.map((input) => (
                      <div key={input.id}>
                        <FormInput
                          {...input}
                          value={values[input.name]}
                          onChange={onChange}
                        />
                        {errors[input.name] && (
                          <span className='text-danger'>
                            {errors[input.name]}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='form-group'>
                    <label>
                      <small className='sepp__signup_small-text'>
                        By registering, you consent to our Terms of Service,
                        Privacy Policy, and Cookie Policy.
                      </small>
                    </label>
                  </div>
                  <br />
                  <input type='submit' className='button' value='Register' />
                  <div className='sepp__signup-login'>
                    Already registered? <br />
                    <ScrollToTop to='/login'>
                      <button>Login here</button>
                    </ScrollToTop>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='sepp__signup-right_container'>
                <div className='sepp__signup-right_container-box'>
                  <header>Ready to Step Up?</header>
                  <p>
                    You're on the brink of transforming your career, and we're
                    thrilled to have you consider joining our community. Here at
                    SEPP, we affectionately call our members "Seppies" — a
                    vibrant group of ambitious individuals ready to take their
                    careers to new heights. <br />
                    Embrace the journey ahead with SEPP. Sign up today to start
                    leveraging the full spectrum of opportunities we've crafted
                    for your success. Your future is waiting, and we're here to
                    help you seize it with confidence.
                  </p>
                  <ScrollToTop to='/library'>
                    <input type='button' value='Learn More' />
                  </ScrollToTop>
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

export default Signup
