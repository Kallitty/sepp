import React from 'react'
import './forminput.css'
import '../../containers/signup/signup.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false)
  const { label, errorMessage, onChange, id, ...inputProps } = props
  const handleFocus = (e) => {
    setFocused(true)
  }
  return (
    <div className='form-group items' style={{ height: '3.5rem' }}>
      <label htmlFor={inputProps.id} className=''>
        {label}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
        className='myInput'
      />
      <span className='sepp__forminput_span'>{errorMessage}</span>
    </div>
  )
}

export default FormInput
