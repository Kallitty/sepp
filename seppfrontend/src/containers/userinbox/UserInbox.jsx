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
  FaChevronLeft,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import axios from 'axios'
import './userinbox.scss'

const UserInbox = () => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showMessageModal, setShowMessageModal] = useState(false)

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
        setShowMessageModal(false)
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const handleMessageClick = (message) => {
    setSelectedMessage(message)
    if (!message.is_read) markAsRead(message.id)

    if (window.innerWidth <= 550) {
      setShowMessageModal(true)
    }
  }

  const closeMessageModal = () => {
    setShowMessageModal(false)
  }

  if (loading) {
    return (
      <div className='inbox__loading-container'>
        <div className='inbox__loading-spinner'></div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className='inbox__empty-state'>
        <div className='inbox__empty-icon'>
          <FaEnvelope />
        </div>
        <h3 className='inbox__empty-title'>No Messages Found</h3>
        <p className='inbox__empty-message'>
          Your inbox is empty. When you receive messages, they'll appear here.
        </p>
      </div>
    )
  }

  return (
    <div className='inbox__container'>
      <h2 className='inbox__header'>Inbox</h2>
      <div className='inbox__content'>
        <div className='inbox__sidebar'>
          <ul className='inbox__list'>
            {messages.map((message) => (
              <li
                key={message.id}
                className={`inbox__item ${
                  selectedMessage?.id === message.id
                    ? 'inbox__item--active'
                    : ''
                } ${!message.is_read ? 'inbox__item--unread' : ''}`}
                onClick={() => handleMessageClick(message)}
              >
                <div className='inbox__item-icon'>
                  {message.is_read ? <FaEnvelopeOpen /> : <FaEnvelope />}
                  {message.attachments?.length > 0 && (
                    <FaPaperclip className='inbox__item-attachment-icon' />
                  )}
                </div>
                <div className='inbox__item-content'>
                  <h3 className='inbox__item-sender'>{message.sender.name}</h3>
                  <p className='inbox__item-subject'>{message.subject}</p>
                  <small className='inbox__item-date'>
                    {new Date(message.created_at).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {window.innerWidth > 550 && (
          <div className='inbox__message-view'>
            {selectedMessage ? (
              <MessageDetail
                message={selectedMessage}
                onMarkAsRead={() => markAsRead(selectedMessage.id)}
                onDelete={() => deleteMessage(selectedMessage.id)}
                isModal={false}
              />
            ) : (
              <div className='inbox__placeholder'>
                <FaEnvelope className='inbox__placeholder-icon' />
                <p className='inbox__placeholder-text'>
                  Select a message to read
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Message Modal */}
      {showMessageModal && selectedMessage && (
        <div className='inbox__message-modal'>
          <div className='inbox__message-modal-content'>
            <MessageDetail
              message={selectedMessage}
              onMarkAsRead={() => markAsRead(selectedMessage.id)}
              onDelete={() => deleteMessage(selectedMessage.id)}
              isModal={true}
              onClose={closeMessageModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const MessageDetail = ({
  message,
  onMarkAsRead,
  onDelete,
  isModal,
  onClose,
}) => {
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false)
  const [currentAttachment, setCurrentAttachment] = useState(null)

  const openAttachmentModal = (attachment) => {
    setCurrentAttachment(attachment)
    setIsAttachmentModalOpen(true)
  }

  const closeAttachmentModal = () => {
    setIsAttachmentModalOpen(false)
    setCurrentAttachment(null)
  }

  const handleDownload = async (attachment) => {
    try {
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
    <div className={`message-detail ${isModal ? 'message-detail--modal' : ''}`}>
      {isModal && (
        <div className='message-detail__mobile-header'>
          <button className='message-detail__mobile-back' onClick={onClose}>
            <FaChevronLeft />
          </button>
          <h2 className='message-detail__mobile-title'>{message.subject}</h2>
        </div>
      )}

      {!isModal && (
        <div className='message-detail__header'>
          <h2 className='message-detail__title'>{message.subject}</h2>
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
      )}

      <div className='message-detail__sender'>
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
        <div className='message-detail__attachments'>
          <h4 className='message-detail__attachments-title'>
            <FaPaperclip /> Attachments ({message.attachments.length})
          </h4>
          <ul className='message-detail__attachments-list'>
            {message.attachments.map((attachment) => (
              <li
                key={attachment.id}
                className='message-detail__attachment-item'
              >
                <div className='message-detail__attachment-info'>
                  {attachment.mime_type.startsWith('image/') && (
                    <img
                      src={`${attachment.path}`}
                      alt={attachment.original_name}
                      className='message-detail__attachment-thumbnail'
                    />
                  )}
                  <span className='message-detail__attachment-name'>
                    {attachment.original_name}
                  </span>
                  <span className='message-detail__attachment-size'>
                    ({Math.round(attachment.size / 1024)} KB)
                  </span>
                </div>
                <div className='message-detail__attachment-actions'>
                  <button
                    onClick={() => openAttachmentModal(attachment)}
                    className='message-detail__btn-view'
                  >
                    <FaEye /> View
                  </button>
                  <button
                    onClick={() => handleDownload(attachment)}
                    className='message-detail__btn-download'
                  >
                    <FaDownload /> Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAttachmentModalOpen && currentAttachment && (
        <div className='message-detail__attachment-modal-overlay'>
          <div className='message-detail__attachment-modal'>
            <div className='message-detail__attachment-modal-header'>
              <h3>{currentAttachment.original_name}</h3>
              <button
                onClick={closeAttachmentModal}
                className='message-detail__attachment-modal-close'
              >
                <FaTimes />
              </button>
            </div>
            <div className='message-detail__attachment-modal-content'>
              {currentAttachment.mime_type.startsWith('image/') ? (
                <img
                  src={`/api/messages/${message.id}/attachments/${currentAttachment.id}`}
                  alt={currentAttachment.original_name}
                  className='message-detail__attachment-modal-preview'
                />
              ) : (
                <div className='message-detail__attachment-modal-unsupported'>
                  <p>Preview not available for this file type</p>
                  <button
                    onClick={() => handleDownload(currentAttachment)}
                    className='message-detail__btn-download'
                  >
                    <FaDownload /> Download File
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!isModal && (
        <div className='message-detail__footer'>
          <button className='message-detail__footer-button'>
            <FaReply className='message-detail__footer-icon' />
            Reply
          </button>
          <button className='message-detail__footer-button'>
            <FaShare className='message-detail__footer-icon' />
            Forward
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInbox
