import React, { useState } from 'react'
import axios from 'axios'
import './reportissue.scss'
import { ClipLoader } from 'react-spinners'
import { FaExclamationTriangle } from 'react-icons/fa'

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    issueType: '',
    details: '',
    screenshot: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')

    try {
      await axios.post('/report-issue', formData)
      setSuccess('Issue report submitted. Thank you for helping us improve!')
      setFormData({ issueType: '', details: '', screenshot: '' })
    } catch (err) {
      setError('Unable to send report. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='reportIssue__container'>
      <div className='reportIssue__card'>
        <div className='reportIssue__icon'>
          <FaExclamationTriangle />
        </div>

        <h2 className='reportIssue__title'>Report an Issue</h2>
        <p className='reportIssue__subtitle'>
          Found a bug, error, or something not working properly? Let us know.
        </p>

        {success && <div className='reportIssue__success'>{success}</div>}
        {error && <div className='reportIssue__error'>{error}</div>}

        <form onSubmit={handleSubmit} className='reportIssue__form'>
          <div className='reportIssue__group'>
            <label>Type of Issue</label>
            <select
              name='issueType'
              value={formData.issueType}
              onChange={handleChange}
              required
            >
              <option value=''>Select issue type</option>
              <option value='bug'>Bug / Technical glitch</option>
              <option value='content-error'>Wrong content / typo</option>
              <option value='account-issue'>Account or login issue</option>
              <option value='other'>Other issue</option>
            </select>
          </div>

          <div className='reportIssue__group'>
            <label>Describe the Issue</label>
            <textarea
              name='details'
              rows='5'
              value={formData.details}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className='reportIssue__group'>
            <label>Screenshot Link (Optional)</label>
            <input
              type='text'
              name='screenshot'
              value={formData.screenshot}
              onChange={handleChange}
              placeholder='Paste image URL (optional)'
            />
          </div>

          <button
            type='submit'
            className='reportIssue__button'
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='#fff' /> : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportIssue
