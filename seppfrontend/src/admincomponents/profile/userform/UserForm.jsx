import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import axios from 'axios'

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isEditMode, setIsEditMode] = useState(!!user)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
      })
      setIsEditMode(true)
    } else {
      setFormData({ name: '', email: '', password: '' })
      setIsEditMode(false)
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditMode) {
      axios
        .put(`/api/users/${user.id}`, formData)
        .then((response) => {
          swal('Success', 'User updated successfully', 'success')
          onSubmit(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors)
            swal('Error', 'There was an issue updating the user', 'error')
          }
        })
    } else {
      axios
        .post('/api/users', formData)
        .then((response) => {
          swal('Success', 'User created successfully', 'success')
          onSubmit(response.data)
        })
        .catch((error) => {
          if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors)
            swal('Error', 'There was an issue creating the user', 'error')
          }
        })
    }
  }

  const switchToCreateMode = () => {
    setFormData({ name: '', email: '', password: '' })
    setIsEditMode(false)
  }

  return (
    <div className='user-form'>
      <h2>{isEditMode ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required={!isEditMode} // Required only when creating a new user
          />
        </div>
        {errors.name && <p className='text-danger'>{errors.name}</p>}
        {errors.email && <p className='text-danger'>{errors.email}</p>}
        {errors.password && <p className='text-danger'>{errors.password}</p>}
        <button type='submit'>{isEditMode ? 'Update' : 'Create'}</button>
      </form>

      {isEditMode && (
        <div className='toggle-mode'>
          <p>Or do you want to create a new user?</p>
          <button className='toggle-button' onClick={switchToCreateMode}>
            Create
          </button>
        </div>
      )}
    </div>
  )
}

export default UserForm
