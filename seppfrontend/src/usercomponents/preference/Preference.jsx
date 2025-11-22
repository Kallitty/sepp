import React, { useEffect, useState } from 'react'
import { BiPalette, BiBell, BiSave } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'
import './preference.scss'

const Preference = () => {
  const [loading, setLoading] = useState(true)
  const [preferences, setPreferences] = useState({
    darkMode: false,
    theme: 'default',
    emailNotifications: true,
    pushNotifications: false,
  })
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch initial preferences data
  useEffect(() => {
    const fetchPreferencesData = async () => {
      try {
        // Simulate fetching data from an endpoint
        const response = await axios.get('/user/preferences')
        setPreferences(response.data)
      } catch (error) {
        // Fallback to default state on error
        console.error('Error fetching user preferences:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPreferencesData()
  }, [])

  // Handler for all form inputs (toggles, selects)
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setPreferences((prevPrefs) => ({
      ...prevPrefs,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSavePreferences = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const response = await axios.post('/user/update-preferences', preferences)
      if (response.data.status === 200) {
        swal(
          'Success',
          response.data.message || 'Preferences updated successfully.',
          'success'
        )
      } else {
        swal(
          'Error',
          response.data.message || 'Failed to save preferences.',
          'error'
        )
      }
    } catch (error) {
      console.error('Error updating preferences:', error.response)
      swal('Error', 'An error occurred while saving preferences.', 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className='preference__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  return (
    <div className='preference__container'>
      <h3 className='preference__header'>User Preferences</h3>

      <form onSubmit={handleSavePreferences}>
        {/* Display Settings Section */}
        <div className='preference__card'>
          <div className='preference__card-header'>
            <BiPalette className='preference__icon' />
            <h4>Display Settings</h4>
          </div>

          <div className='preference__form-group preference__toggle-group'>
            <label htmlFor='darkMode'>Dark Mode</label>
            <input
              type='checkbox'
              id='darkMode'
              name='darkMode'
              checked={preferences.darkMode}
              onChange={handleChange}
              className='preference__toggle-switch'
            />
          </div>

          <div className='preference__form-group'>
            <label htmlFor='theme'>Application Theme</label>
            <select
              id='theme'
              name='theme'
              value={preferences.theme}
              onChange={handleChange}
              className='preference__select'
            >
              <option value='default'>Default (Purple)</option>
              <option value='blue'>Blue</option>
              <option value='green'>Green</option>
            </select>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className='preference__card'>
          <div className='preference__card-header'>
            <BiBell className='preference__icon' />
            <h4>Notification Preferences</h4>
          </div>

          <div className='preference__form-group preference__toggle-group'>
            <label htmlFor='emailNotifications'>Email Notifications</label>
            <input
              type='checkbox'
              id='emailNotifications'
              name='emailNotifications'
              checked={preferences.emailNotifications}
              onChange={handleChange}
              className='preference__toggle-switch'
            />
          </div>

          <div className='preference__form-group preference__toggle-group'>
            <label htmlFor='pushNotifications'>
              Push Notifications (Mobile)
            </label>
            <input
              type='checkbox'
              id='pushNotifications'
              name='pushNotifications'
              checked={preferences.pushNotifications}
              onChange={handleChange}
              className='preference__toggle-switch'
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type='submit'
          className='preference__submit-button'
          disabled={isUpdating}
        >
          {isUpdating ? (
            <ClipLoader size={18} color={'#fff'} />
          ) : (
            <>
              <BiSave /> Save Preferences
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default Preference
