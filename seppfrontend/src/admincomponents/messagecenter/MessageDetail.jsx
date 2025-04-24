import React from 'react'
import {
  FaReply,
  FaShare,
  FaTrash,
  FaStar,
  FaEnvelopeOpen,
  FaEnvelope,
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import moment from 'moment'
import './messagedetail.scss'

const MessageDetail = ({ message, onMarkAsRead, onDelete }) => {
  return (
    <div className='message-detail'>
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
          <button className='message-detail__action' aria-label='Star'>
            <FaStar />
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
        <div className='message-detail__avatar'>
          {message.sender.avatar_url ? (
            <img src={message.sender.avatar_url} alt={message.sender.name} />
          ) : (
            <span>{message.sender.name.charAt(0)}</span>
          )}
        </div>
        <div className='message-detail__sender-info'>
          <p className='message-detail__sender-name'>
            From: {message.sender.name}
          </p>
          <p className='message-detail__date'>
            {moment(message.created_at).format('MMMM D, YYYY [at] h:mm A')}
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

export default MessageDetail
