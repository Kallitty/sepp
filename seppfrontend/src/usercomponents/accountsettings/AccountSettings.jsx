import React, { useEffect, useState } from 'react'
import { BiUser, BiLock, BiSave } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'
import './accountsettings.scss'

const AccountSettings = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ name: '', email: '' })
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch initial user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/settings') // Assume this endpoint fetches name and email
        setUser({ name: response.data.name, email: response.data.email })
      } catch (error) {
        console.error('Error fetching user data:', error)
        swal('Error', 'Failed to fetch user settings.', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  // Handlers for name/email update
  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const response = await axios.post('/user/update-profile', user) // Update name and email
      if (response.data.status === 200) {
        swal('Success', response.data.message, 'success')
      } else {
        swal('Error', response.data.message || 'Update failed.', 'error')
      }
    } catch (error) {
      console.error('Error updating profile:', error.response)
      swal('Error', 'An error occurred during profile update.', 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  // Handlers for password change
  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const response = await axios.post('/user/change-password', passwordForm)
      if (response.data.status === 200) {
        swal('Success', response.data.message, 'success')
        setPasswordForm({
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        }) // Clear form on success
      } else {
        // Handle validation errors or incorrect current password
        const message = response.data.message || 'Password change failed.'
        swal('Error', message, 'error')
      }
    } catch (error) {
      console.error('Error changing password:', error.response)
      swal('Error', 'An error occurred during password change.', 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className='accountSettings__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  return (
    <div className='accountSettings__container'>
      <h3 className='accountSettings__header'>Account Settings</h3>

      {/* Profile Update Section */}
      <div className='accountSettings__card'>
        <div className='accountSettings__card-header'>
          <BiUser className='accountSettings__icon' />
          <h4>Update Profile Information</h4>
        </div>
        <form className='accountSettings__form' onSubmit={handleProfileUpdate}>
          <div className='accountSettings__form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={user.name}
              onChange={handleUserChange}
              required
            />
          </div>
          <div className='accountSettings__form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={handleUserChange}
              required
            />
          </div>
          <button
            type='submit'
            className='accountSettings__submit-button'
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ClipLoader size={18} color={'#fff'} />
            ) : (
              <>
                <BiSave /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>

      {/* Password Change Section */}
      <div className='accountSettings__card'>
        <div className='accountSettings__card-header'>
          <BiLock className='accountSettings__icon' />
          <h4>Change Password</h4>
        </div>
        <form className='accountSettings__form' onSubmit={handlePasswordUpdate}>
          <div className='accountSettings__form-group'>
            <label htmlFor='current_password'>Current Password</label>
            <input
              type='password'
              id='current_password'
              name='current_password'
              value={passwordForm.current_password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='accountSettings__form-group'>
            <label htmlFor='new_password'>New Password</label>
            <input
              type='password'
              id='new_password'
              name='new_password'
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className='accountSettings__form-group'>
            <label htmlFor='new_password_confirmation'>
              Confirm New Password
            </label>
            <input
              type='password'
              id='new_password_confirmation'
              name='new_password_confirmation'
              value={passwordForm.new_password_confirmation}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type='submit'
            className='accountSettings__submit-button'
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ClipLoader size={18} color={'#fff'} />
            ) : (
              <>
                <BiSave /> Change Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AccountSettings
