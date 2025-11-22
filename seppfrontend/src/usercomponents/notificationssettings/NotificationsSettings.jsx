import React, { useEffect, useState } from 'react'
import { BiBell, BiSave, BiTimeFive } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'
import './notificationssettings.scss'

const NotificationsSettings = () => {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState({
    quizReleaseAlerts: true,
    scoreAvailability: true,
    dailyReminder: false,
    dailyReminderTime: '08:00', // Default time
    marketingEmails: false,
    newFeatureAnnouncements: true,
  })
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch initial notification settings data
  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        // Simulate fetching data from an endpoint
        const response = await axios.get('/user/notification-settings')
        setSettings(response.data)
      } catch (error) {
        // Fallback to default state on error
        console.error('Error fetching notification settings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSettingsData()
  }, [])

  // Handler for all form inputs (toggles, time input)
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    setIsUpdating(true)
    try {
      const response = await axios.post(
        '/user/update-notification-settings',
        settings
      )
      if (response.data.status === 200) {
        swal(
          'Success',
          response.data.message || 'Notification settings saved.',
          'success'
        )
      } else {
        swal(
          'Error',
          response.data.message || 'Failed to save notification settings.',
          'error'
        )
      }
    } catch (error) {
      console.error('Error updating settings:', error.response)
      swal(
        'Error',
        'An error occurred while saving notification settings.',
        'error'
      )
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className='notificationsSettings__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  return (
    <div className='notificationsSettings__container'>
      <h3 className='notificationsSettings__header'>Notification Center</h3>

      <form onSubmit={handleSaveSettings}>
        {/* Academic Alerts Section */}
        <div className='notificationsSettings__card'>
          <div className='notificationsSettings__card-header'>
            <BiBell className='notificationsSettings__icon' />
            <h4>Academic Alerts</h4>
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__toggle-group'>
            <label htmlFor='quizReleaseAlerts'>New Quiz Release Alerts</label>
            <input
              type='checkbox'
              id='quizReleaseAlerts'
              name='quizReleaseAlerts'
              checked={settings.quizReleaseAlerts}
              onChange={handleChange}
              className='notificationsSettings__toggle-switch'
            />
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__toggle-group'>
            <label htmlFor='scoreAvailability'>Exam Score Availability</label>
            <input
              type='checkbox'
              id='scoreAvailability'
              name='scoreAvailability'
              checked={settings.scoreAvailability}
              onChange={handleChange}
              className='notificationsSettings__toggle-switch'
            />
          </div>
        </div>

        {/* Daily Reminders Section */}
        <div className='notificationsSettings__card'>
          <div className='notificationsSettings__card-header'>
            <BiTimeFive className='notificationsSettings__icon' />
            <h4>Learning Reminders</h4>
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__toggle-group'>
            <label htmlFor='dailyReminder'>Enable Daily Study Reminder</label>
            <input
              type='checkbox'
              id='dailyReminder'
              name='dailyReminder'
              checked={settings.dailyReminder}
              onChange={handleChange}
              className='notificationsSettings__toggle-switch'
            />
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__time-group'>
            <label htmlFor='dailyReminderTime'>Reminder Time (Local)</label>
            <input
              type='time'
              id='dailyReminderTime'
              name='dailyReminderTime'
              value={settings.dailyReminderTime}
              onChange={handleChange}
              disabled={!settings.dailyReminder}
              className='notificationsSettings__time-input'
            />
          </div>
        </div>

        {/* Marketing/Feature Section */}
        <div className='notificationsSettings__card'>
          <div className='notificationsSettings__card-header'>
            <BiTimeFive className='notificationsSettings__icon' />
            <h4>Marketing & Product Updates</h4>
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__toggle-group'>
            <label htmlFor='newFeatureAnnouncements'>
              New Feature Announcements
            </label>
            <input
              type='checkbox'
              id='newFeatureAnnouncements'
              name='newFeatureAnnouncements'
              checked={settings.newFeatureAnnouncements}
              onChange={handleChange}
              className='notificationsSettings__toggle-switch'
            />
          </div>

          <div className='notificationsSettings__form-group notificationsSettings__toggle-group'>
            <label htmlFor='marketingEmails'>Promotional Emails & Offers</label>
            <input
              type='checkbox'
              id='marketingEmails'
              name='marketingEmails'
              checked={settings.marketingEmails}
              onChange={handleChange}
              className='notificationsSettings__toggle-switch'
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type='submit'
          className='notificationsSettings__submit-button'
          disabled={isUpdating}
        >
          {isUpdating ? (
            <ClipLoader size={18} color={'#fff'} />
          ) : (
            <>
              <BiSave /> Save Settings
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default NotificationsSettings
