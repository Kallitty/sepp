import React, { useState, useEffect } from 'react'
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaReply,
  FaShare,
  FaPaperclip,
  FaDownload,
  FaEye,
  FaTimes,
} from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './userinbox.scss'

const UserInbox = () => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/user/messages')
        setMessages(response.data)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  const markAsRead = async (messageId) => {
    try {
      await axios.patch(`/user/messages/${messageId}/read`)
      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      )
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, is_read: true })
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(`/user/messages/${messageId}`)
      setMessages(messages.filter((msg) => msg.id !== messageId))
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  return (
    <div className='inbox'>
      <div className='inbox__sidebar'>
        <h2 className='inbox__title'>Inbox</h2>

        {loading ? (
          <div className='inbox__loading'>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className='inbox__empty'>No messages</div>
        ) : (
          <ul className='inbox__list'>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`inbox__item ${
                  selectedMessage?.id === message.id ? 'active' : ''
                } ${!message.is_read ? 'unread' : ''}`}
                onClick={() => {
                  setSelectedMessage(message)
                  if (!message.is_read) markAsRead(message.id)
                }}
              >
                <div className='inbox__item-icon'>
                  {message.is_read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                  {message.attachments?.length > 0 && (
                    <FaPaperclip className='inbox__item-attachment-icon' />
                  )}
                </div>
                <div className='inbox__item-content'>
                  <h3>{message.sender.name}</h3>
                  <p>{message.subject}</p>
                  <small>{new Date(message.created_at).toLocaleString()}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='inbox__content'>
        {selectedMessage ? (
          <MessageDetail
            message={selectedMessage}
            onMarkAsRead={() => markAsRead(selectedMessage.id)}
            onDelete={() => deleteMessage(selectedMessage.id)}
          />
        ) : (
          <div className='inbox__placeholder'>
            <FaEnvelope className='inbox__placeholder-icon' />
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  )
}

const MessageDetail = ({ message, onMarkAsRead, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAttachment, setCurrentAttachment] = useState(null)

  const openAttachment = (attachment) => {
    setCurrentAttachment(attachment)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentAttachment(null)
  }

  const handleDownload = async (attachment) => {
    try {
      // Create a temporary anchor element
      const link = document.createElement('a')
      link.href = `/api/messages/${message.id}/attachments/${attachment.id}?download=true`
      link.download = attachment.original_name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  return (
    <div className='message-detail'>
      {/* ... (keep existing header, sender info, content) ... */}
      <div className='message-detail__header'>
        <h2>{message.subject}</h2>
        <div className='message-detail__actions'>
          <button
            onClick={onMarkAsRead}
            disabled={message.is_read}
            className='message-detail__action'
            aria-label='Mark as read'
          >
            {message.is_read ? <FaEnvelopeOpen /> : <FaEnvelope />}
          </button>
          <button
            onClick={onDelete}
            className='message-detail__action message-detail__action--delete'
            aria-label='Delete'
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className='message-detail__sender'>
        {/* <div className='message-detail__avatar'>
          {message.sender.profile_picture ? (
            <img
              // src={`http://localhost:8000/uploads/profile/${message.sender.profile_picture}`}
              src={
                message.sender.profile_picture.startsWith('http')
                  ? message.sender.profile_picture
                  : `uploads/profile/profile_pictures/${message.sender.profile_picture}`
              }
              http:alt={
                //localhost:8000/storage/profile_pictures/1744290408.jpg
                message.sender.name
              }
            />
          ) : (
            <span>{message.sender.name.charAt(3)}</span>
          )}
        </div> */}
        {/* <div className='message-detail__avatar'>
          {message.sender.profile_picture ? (
            <img
              src={`${window.location.origin}/storage/profile_pictures/${message.sender.profile_picture}`}
              alt={message.sender.name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = ''
              }}
            />
          ) : (
            <span>{message.sender.name.charAt(0)}</span>
          )}
        </div> */}
        {/* could not use it bc the image comes from the admin route or maybe not */}

        <div className='message-detail__sender-info'>
          <p className='message-detail__sender-name'>
            From: {message.sender.name}
          </p>
          <p className='message-detail__date'>
            {new Date(message.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {message.email_sent && (
        <div className='message-detail__email-tag'>
          <MdEmail className='message-detail__email-icon' />
          <span>Also sent via email</span>
        </div>
      )}

      <div className='message-detail__content'>{message.content}</div>

      {message.attachments?.length > 0 && (
        <div className='attachments-section'>
          <h4>
            <FaPaperclip /> Attachments ({message.attachments.length})
          </h4>
          <ul className='attachments-list'>
            {message.attachments.map((attachment) => (
              <li key={attachment.id} className='attachment-item'>
                <div className='attachment-info'>
                  {attachment.mime_type.startsWith('image/') && (
                    <img
                      src={`${attachment.path}`}
                      alt={attachment.original_name}
                      className='attachment-thumbnail'
                    />
                  )}
                  <span className='attachment-name'>
                    {attachment.original_name}
                  </span>
                  <span className='attachment-size'>
                    ({Math.round(attachment.size / 1024)} KB)
                  </span>
                </div>
                <div className='attachment-actions'>
                  <button
                    onClick={() => openAttachment(attachment)}
                    className='btn-view'
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className='btn-download'
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Simple Modal Implementation */}
      {isModalOpen && currentAttachment && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <h3>{currentAttachment.original_name}</h3>
              <button onClick={closeModal} className='close-btn'>
                &times;
              </button>
            </div>
            <div className='modal-content'>
              {currentAttachment.mime_type.startsWith('image/') ? (
                <img
                  src={`/api/messages/${message.id}/attachments/${currentAttachment.id}`}
                  alt={currentAttachment.original_name}
                  className='attachment-preview'
                />
              ) : (
                <div className='unsupported-type'>
                  <p>Preview not available for this file type</p>
                  <button
                    onClick={() => handleDownload(currentAttachment)}
                    className='btn-download'
                  >
                    <FaDownload /> Download File
                  </button>
                </div>
              )}
            </div>
            <div className='modal-footer'>
              <button onClick={closeModal} className='btn-close'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ... (keep existing footer buttons) ... */}
      <div className='message-detail__footer'>
        <button className='message-detail__button'>
          <FaReply className='message-detail__button-icon' />
          Reply
        </button>
        <button className='message-detail__button'>
          <FaShare className='message-detail__button-icon' />
          Forward
        </button>
      </div>
    </div>
  )
}

export default UserInbox
