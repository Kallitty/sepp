import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import {
  FaPaperPlane,
  FaEnvelope,
  FaComments,
  FaUsers,
  FaCheckSquare,
  FaChevronLeft,
  FaChevronRight,
  FaPaperclip,
  FaTimes,
} from 'react-icons/fa'
import './messagecenter.scss'

const MessageCenter = () => {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState({
    subject: '',
    content: '',
    send_email: true,
    send_to_all: false,
  })
  const [loading, setLoading] = useState(false)
  const [usersLoading, setUsersLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [attachments, setAttachments] = useState([])
  const fileInputRef = useRef(null)
  const usersPerPage = 50

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/messages/users')
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
        swal('Error', 'Failed to load users', 'error')
      } finally {
        setUsersLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!message.send_to_all && selectedUsers.length === 0) {
      swal(
        'Warning',
        'Please select at least one user or choose "Send to all"',
        'warning'
      )
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('subject', message.subject)
      formData.append('content', message.content)
      formData.append('send_email', message.send_email ? '1' : '0')
      formData.append('send_to_all', message.send_to_all ? '1' : '0')

      if (!message.send_to_all) {
        formData.append(
          'user_ids',
          JSON.stringify(selectedUsers.map((u) => u.id))
        )
      }

      // Properly append each file
      attachments.forEach((file) => {
        formData.append('attachments[]', file, file.name) // Include filename
      })

      const response = await axios.post('/admin/messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      swal('Success', response.data.message, 'success')
      setMessage({
        subject: '',
        content: '',
        send_email: true,
        send_to_all: false,
      })
      setSelectedUsers([])
      setAttachments([])
    } catch (error) {
      console.error('Error sending message:', error)
      swal(
        'Error',
        error.response?.data?.message || 'Failed to send messages',
        'error'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments([...attachments, ...files])
  }

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleSelectAll = () => {
    const allUsersOnPage = currentUsers.map((user) => user.id)
    const newSelectedUsers = [...selectedUsers]

    // Add users not already selected
    currentUsers.forEach((user) => {
      if (!selectedUsers.some((u) => u.id === user.id)) {
        newSelectedUsers.push(user)
      }
    })

    setSelectedUsers(newSelectedUsers)
  }

  const handleDeselectAll = () => {
    const usersOnPageIds = currentUsers.map((user) => user.id)
    setSelectedUsers(
      selectedUsers.filter((user) => !usersOnPageIds.includes(user.id))
    )
  }

  return (
    <div className='message-center'>
      <div className='message-center__header'>
        <FaComments className='message-center__icon' />
        <h2>Message Center</h2>
      </div>

      <form onSubmit={handleSubmit} className='message-form'>
        <div className='message-form__group'>
          <label className='message-form__checkbox'>
            <input
              type='checkbox'
              checked={message.send_to_all}
              onChange={(e) =>
                setMessage({ ...message, send_to_all: e.target.checked })
              }
            />
            <FaUsers className='message-form__checkbox-icon' />
            <span>Send to all users</span>
          </label>
        </div>

        {!message.send_to_all && (
          <>
            <div className='message-form__group'>
              <label>Select Recipients</label>
              <div className='message-form__recipient-actions'>
                <button
                  type='button'
                  onClick={handleSelectAll}
                  className='message-form__action-btn'
                >
                  <FaCheckSquare /> Select All on Page
                </button>
                <button
                  type='button'
                  onClick={handleDeselectAll}
                  className='message-form__action-btn'
                >
                  Deselect All on Page
                </button>
              </div>
              <div className='message-form__recipients'>
                {usersLoading ? (
                  <div className='message-form__loading'>Loading users...</div>
                ) : (
                  <div className='message-form__users-list'>
                    {currentUsers.map((user) => (
                      <div
                        key={user.id}
                        className='message-form__user-checkbox'
                      >
                        <label>
                          <input
                            type='checkbox'
                            checked={selectedUsers.some(
                              (u) => u.id === user.id
                            )}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, user])
                              } else {
                                setSelectedUsers(
                                  selectedUsers.filter((u) => u.id !== user.id)
                                )
                              }
                            }}
                          />
                          {user.name} ({user.email})
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='message-form__pagination'>
                <button
                  type='button'
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='message-form__pagination-btn'
                >
                  <FaChevronLeft /> Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type='button'
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='message-form__pagination-btn'
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </div>
          </>
        )}

        <div className='message-form__group'>
          <label>Subject</label>
          <input
            type='text'
            value={message.subject}
            onChange={(e) =>
              setMessage({ ...message, subject: e.target.value })
            }
            required
            className='message-form__input'
          />
        </div>

        <div className='message-form__group'>
          <label>Message Content</label>
          <textarea
            value={message.content}
            onChange={(e) =>
              setMessage({ ...message, content: e.target.value })
            }
            required
            rows={6}
            className='message-form__textarea'
          />
        </div>

        <div className='message-form__group'>
          <label>Attachments</label>
          <div className='message-form__attachments'>
            <button
              type='button'
              onClick={() => fileInputRef.current.click()}
              className='message-form__add-attachment'
            >
              <FaPaperclip /> Add Files
            </button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />

            {attachments.length > 0 && (
              <div className='message-form__attachment-list'>
                {attachments.map((file, index) => (
                  <div key={index} className='message-form__attachment-item'>
                    <div className='message-form__attachment-info'>
                      <span className='message-form__attachment-name'>
                        {file.name}
                      </span>
                      <span className='message-form__attachment-size'>
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <button
                      type='button'
                      onClick={() => removeAttachment(index)}
                      className='message-form__remove-attachment'
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='message-form__group'>
          <label className='message-form__checkbox'>
            <input
              type='checkbox'
              checked={message.send_email}
              onChange={(e) =>
                setMessage({ ...message, send_email: e.target.checked })
              }
            />
            <FaEnvelope className='message-form__checkbox-icon' />
            <span>Also send as email notification</span>
          </label>
        </div>

        <div className='message-form__footer'>
          <div className='message-form__info'>
            {message.send_to_all ? (
              'Will be sent to all users'
            ) : (
              <>
                Selected {selectedUsers.length} user
                {selectedUsers.length !== 1 ? 's' : ''}
                {selectedUsers.length > 0 && (
                  <button
                    type='button'
                    onClick={() => setSelectedUsers([])}
                    className='message-form__clear-btn'
                  >
                    Clear All
                  </button>
                )}
              </>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='message-form__submit'
          >
            <FaPaperPlane className='message-form__submit-icon' />
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageCenter
