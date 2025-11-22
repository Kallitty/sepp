import React, { useState } from 'react'
import { BiError, BiSend } from 'react-icons/bi'
import axios from 'axios'
import swal from 'sweetalert'
import { ClipLoader } from 'react-spinners'
import './reportissue.scss'

const ReportIssue = () => {
  const [issueForm, setIssueForm] = useState({
    component: '',
    type: 'bug', // Default to bug
    subject: '',
    description: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setIssueForm({ ...issueForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!issueForm.component || !issueForm.subject || !issueForm.description) {
      swal('Error', 'Please fill in all required fields.', 'error')
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call to send the issue report
      const response = await axios.post('/submit-issue-report', issueForm)

      if (response.data.status === 200) {
        swal(
          'Success',
          'Your issue has been reported. Thank you for helping us improve!',
          'success'
        )
        // Reset form on successful submission
        setIssueForm({
          component: '',
          type: 'bug',
          subject: '',
          description: '',
        })
      } else {
        swal(
          'Error',
          response.data.message || 'Failed to submit issue report.',
          'error'
        )
      }
    } catch (error) {
      console.error('Error submitting issue:', error.response)
      swal('Error', 'An unexpected error occurred.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='reportIssue__container'>
      <h3 className='reportIssue__header'>Report an Issue or Bug</h3>

      <div className='reportIssue__card'>
        <div className='reportIssue__card-header'>
          <BiError className='reportIssue__icon' />
          <h4>Issue Details</h4>
        </div>

        <form className='reportIssue__form' onSubmit={handleSubmit}>
          <div className='reportIssue__form-group'>
            <label htmlFor='component'>
              Affected Component / Page (e.g., Exam Page, Sidebar, Dashboard)
            </label>
            <input
              type='text'
              id='component'
              name='component'
              value={issueForm.component}
              onChange={handleChange}
              placeholder='e.g., "Results Page Pagination"'
              required
            />
          </div>

          <div className='reportIssue__form-group'>
            <label htmlFor='type'>Type of Issue</label>
            <select
              id='type'
              name='type'
              value={issueForm.type}
              onChange={handleChange}
              className='reportIssue__select'
            >
              <option value='bug'>Bug / Error</option>
              <option value='feature'>Feature Request / Suggestion</option>
              <option value='ui'>UI/Design Problem</option>
              <option value='data'>Data Inaccuracy</option>
            </select>
          </div>

          <div className='reportIssue__form-group'>
            <label htmlFor='subject'>Subject / Short Summary</label>
            <input
              type='text'
              id='subject'
              name='subject'
              value={issueForm.subject}
              onChange={handleChange}
              placeholder='Brief description of the issue'
              required
            />
          </div>

          <div className='reportIssue__form-group'>
            <label htmlFor='description'>
              Detailed Description (Steps to Reproduce)
            </label>
            <textarea
              id='description'
              name='description'
              value={issueForm.description}
              onChange={handleChange}
              rows='6'
              placeholder='Provide steps you took, what happened, and what you expected to happen.'
              required
            />
          </div>

          <button
            type='submit'
            className='reportIssue__submit-button'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ClipLoader size={18} color={'#fff'} />
            ) : (
              <>
                <BiSend /> Submit Report
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ReportIssue
