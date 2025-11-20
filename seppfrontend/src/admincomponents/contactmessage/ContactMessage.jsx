import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {
  FaEnvelopeOpen,
  FaReply,
  FaSpinner,
  FaTimes,
  FaEnvelope,
} from 'react-icons/fa'
import './contactmessage.scss' // Import the new SCSS file

const ContactMessage = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyData, setReplyData] = useState({ subject: '', reply_content: '' })
  const [isReplying, setIsReplying] = useState(false)
  const [replyErrors, setReplyErrors] = useState({})

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/contact-messages')
      if (res.data.status === 200) {
        setMessages(res.data.messages)
      }
    } catch (error) {
      swal('Error', 'Failed to fetch messages.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleViewMessage = async (message) => {
    setSelectedMessage(message)
    setShowModal(true)
    setReplyData({
      subject: `Re: Your Inquiry (${message.id})`,
      reply_content: '',
    })
    setReplyErrors({})

    // Mark as read immediately if it's unread
    if (!message.is_read) {
      try {
        await axios.put(`/contact-messages/${message.id}/mark-read`)
        // Update state to reflect the change
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m))
        )
      } catch (error) {
        console.error('Failed to mark message as read', error)
      }
    }
  }

  const handleReplyChange = (e) => {
    setReplyData({ ...replyData, [e.target.name]: e.target.value })
  }

  const handleSendReply = async (e) => {
    e.preventDefault()
    setIsReplying(true)
    setReplyErrors({})

    try {
      const res = await axios.post(
        `/contact-messages/${selectedMessage.id}/reply`,
        replyData
      )

      if (res.data.status === 200) {
        swal('Success', res.data.message, 'success')
        setShowModal(false)
        // Ensure the message is marked as read after reply
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedMessage.id ? { ...m, is_read: true } : m
          )
        )
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setReplyErrors(error.response.data.errors)
      } else {
        swal(
          'Error',
          error.response?.data?.message || 'Failed to send reply.',
          'error'
        )
      }
    } finally {
      setIsReplying(false)
    }
  }

  const closeModal = () => setShowModal(false)

  if (loading) {
    return (
      <div className='contact-message__loading'>
        <FaSpinner className='fa-spin' /> Loading Messages...
      </div>
    )
  }

  return (
    <div className='contact-message'>
      <h2 className='contact-message__title'>Customer Contact Messages</h2>
      <p className='contact-message__info'>Total Messages: {messages.length}</p>

      <div className='contact-message__card'>
        <div className='contact-message__card-header'>Message Inbox</div>
        <div className='contact-message__table-responsive'>
          <table className='contact-message__table'>
            <thead>
              <tr>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject/Content Snippet</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={
                      !msg.is_read
                        ? 'contact-message__unread'
                        : 'contact-message__read'
                    }
                  >
                    <td>
                      {msg.is_read ? (
                        <span className='contact-message__badge--success'>
                          Read
                        </span>
                      ) : (
                        <span className='contact-message__badge--danger'>
                          New
                        </span>
                      )}
                    </td>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>
                      {msg.message.length > 50
                        ? `${msg.message.substring(0, 50)}...`
                        : msg.message}
                    </td>
                    <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        className='contact-message__view-btn'
                        onClick={() => handleViewMessage(msg)}
                      >
                        <FaEnvelopeOpen /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='contact-message__empty'>
                    No contact messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Modal for Message View and Reply */}
      {showModal && selectedMessage && (
        <div className='custom-modal__backdrop'>
          <div className='custom-modal__content'>
            <div className='custom-modal__header'>
              <h5 className='custom-modal__title'>
                Message from {selectedMessage.name}
              </h5>
              <button
                type='button'
                className='custom-modal__close'
                onClick={closeModal}
              >
                <FaTimes />
              </button>
            </div>

            <div className='custom-modal__body'>
              <p>
                <strong>From:</strong> {selectedMessage.email}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(selectedMessage.created_at).toLocaleString()}
              </p>
              <hr />
              <h5>Original Message:</h5>

              {/* Card replacement for original message */}
              <div className='contact-message__original-card'>
                {selectedMessage.message}
              </div>

              <h5 className='contact-message__reply-header'>
                <FaReply /> Send Reply (Via Email)
              </h5>

              <form onSubmit={handleSendReply}>
                <div className='form-group'>
                  <label htmlFor='subject'>Subject</label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={replyData.subject}
                    onChange={handleReplyChange}
                    className={`form-control ${
                      replyErrors.subject ? 'is-invalid' : ''
                    }`}
                    required
                  />
                  {replyErrors.subject && (
                    <div className='invalid-feedback'>
                      {replyErrors.subject}
                    </div>
                  )}
                </div>
                <div className='form-group'>
                  <label htmlFor='reply_content'>Reply Content</label>
                  <textarea
                    id='reply_content'
                    rows='5'
                    name='reply_content'
                    value={replyData.reply_content}
                    onChange={handleReplyChange}
                    className={`form-control ${
                      replyErrors.reply_content ? 'is-invalid' : ''
                    }`}
                    required
                  ></textarea>
                  {replyErrors.reply_content && (
                    <div className='invalid-feedback'>
                      {replyErrors.reply_content}
                    </div>
                  )}
                </div>
                <button
                  type='submit'
                  className='contact-message__send-btn'
                  disabled={isReplying}
                >
                  {isReplying ? (
                    <>
                      <FaSpinner className='fa-spin' /> Sending...
                    </>
                  ) : (
                    'Send Reply Email'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactMessage

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import swal from 'sweetalert'
// import { FaEnvelopeOpen, FaReply, FaSpinner } from 'react-icons/fa'
// import { Modal, Button, Card, Form } from 'react-bootstrap'

// const ContactMessage = () => {
//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedMessage, setSelectedMessage] = useState(null)
//   const [replyData, setReplyData] = useState({ subject: '', reply_content: '' })
//   const [isReplying, setIsReplying] = useState(false)
//   const [replyErrors, setReplyErrors] = useState({})

//   useEffect(() => {
//     fetchMessages()
//   }, [])

//   const fetchMessages = async () => {
//     try {
//       const res = await axios.get('/contact-messages')
//       if (res.data.status === 200) {
//         setMessages(res.data.messages)
//       }
//     } catch (error) {
//       swal('Error', 'Failed to fetch messages.', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleViewMessage = async (message) => {
//     setSelectedMessage(message)
//     setShowModal(true)
//     setReplyData({
//       subject: `Re: Your Inquiry (${message.id})`,
//       reply_content: '',
//     })
//     setReplyErrors({})

//     // Mark as read immediately if it's unread
//     if (!message.is_read) {
//       try {
//         await axios.put(`/contact-messages/${message.id}/mark-read`)
//         // Update state to reflect the change without refetching the entire list
//         setMessages((prev) =>
//           prev.map((m) => (m.id === message.id ? { ...m, is_read: true } : m))
//         )
//       } catch (error) {
//         console.error('Failed to mark message as read', error)
//       }
//     }
//   }

//   const handleReplyChange = (e) => {
//     setReplyData({ ...replyData, [e.target.name]: e.target.value })
//   }

//   const handleSendReply = async (e) => {
//     e.preventDefault()
//     setIsReplying(true)
//     setReplyErrors({})

//     try {
//       const res = await axios.post(
//         `/contact-messages/${selectedMessage.id}/reply`,
//         replyData
//       )

//       if (res.data.status === 200) {
//         swal('Success', res.data.message, 'success')
//         setShowModal(false)
//         // Ensure the message is marked as read after reply
//         setMessages((prev) =>
//           prev.map((m) =>
//             m.id === selectedMessage.id ? { ...m, is_read: true } : m
//           )
//         )
//       }
//     } catch (error) {
//       if (error.response?.status === 422) {
//         setReplyErrors(error.response.data.errors)
//       } else {
//         swal(
//           'Error',
//           error.response?.data?.message || 'Failed to send reply.',
//           'error'
//         )
//       }
//     } finally {
//       setIsReplying(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className='text-center mt-5'>
//         <FaSpinner className='fa-spin' /> Loading Messages...
//       </div>
//     )
//   }

//   return (
//     <div className='container mt-4'>
//       <h2>Customer Contact Messages</h2>
//       <p>Total Messages: {messages.length}</p>

//       <Card>
//         <Card.Header>Message Inbox</Card.Header>
//         <div className='table-responsive'>
//           <table className='table table-striped table-hover mb-0'>
//             <thead>
//               <tr>
//                 <th>Status</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Subject/Content Snippet</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {messages.length > 0 ? (
//                 messages.map((msg) => (
//                   <tr
//                     key={msg.id}
//                     className={!msg.is_read ? 'table-warning' : ''}
//                   >
//                     <td>
//                       {msg.is_read ? (
//                         <span className='badge bg-success'>Read</span>
//                       ) : (
//                         <span className='badge bg-danger'>New</span>
//                       )}
//                     </td>
//                     <td>{msg.name}</td>
//                     <td>{msg.email}</td>
//                     <td>{msg.message.substring(0, 50)}...</td>
//                     <td>{new Date(msg.created_at).toLocaleDateString()}</td>
//                     <td>
//                       <Button
//                         variant='primary'
//                         size='sm'
//                         onClick={() => handleViewMessage(msg)}
//                       >
//                         <FaEnvelopeOpen /> View
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan='6' className='text-center'>
//                     No contact messages found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       {/* Message View and Reply Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
//         <Modal.Header closeButton>
//           <Modal.Title>Message from {selectedMessage?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>
//             <strong>From:</strong> {selectedMessage?.email}
//           </p>
//           <p>
//             <strong>Date:</strong>{' '}
//             {new Date(selectedMessage?.created_at).toLocaleString()}
//           </p>
//           <hr />
//           <h5>Message:</h5>

//           <Card body className='bg-light p-3'>
//             {selectedMessage?.message} {/* This is the original message */}
//           </Card>
//           <h5 className='mt-4'>
//             <FaReply /> Send Reply (Via Email)
//           </h5>

//           <Form onSubmit={handleSendReply}>
//             <Form.Group className='mb-3'>
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 type='text'
//                 name='subject'
//                 value={replyData.subject}
//                 onChange={handleReplyChange}
//                 isInvalid={!!replyErrors.subject}
//                 required
//               />
//               <Form.Control.Feedback type='invalid'>
//                 {replyErrors.subject}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Form.Group className='mb-3'>
//               <Form.Label>Reply Content</Form.Label>
//               <Form.Control
//                 as='textarea'
//                 rows={5}
//                 name='reply_content'
//                 value={replyData.reply_content}
//                 onChange={handleReplyChange}
//                 isInvalid={!!replyErrors.reply_content}
//                 required
//               />
//               <Form.Control.Feedback type='invalid'>
//                 {replyErrors.reply_content}
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Button variant='success' type='submit' disabled={isReplying}>
//               {isReplying ? (
//                 <>
//                   <FaSpinner className='fa-spin' /> Sending...
//                 </>
//               ) : (
//                 'Send Reply Email'
//               )}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   )
// }

// export default ContactMessage
