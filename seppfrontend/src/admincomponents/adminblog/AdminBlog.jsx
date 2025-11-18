import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaHourglassHalf,
} from 'react-icons/fa'
import './adminblog.scss'
import Swal from 'sweetalert'

const SubmissionModal = ({ show, onClose, onSubmit }) => {
  const [notes, setNotes] = useState('')

  if (!show) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Submit for Review</h3>
        <textarea
          placeholder='Add any notes for the reviewer (optional)'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className='modal-notes-input'
        />
        <div className='modal-buttons'>
          <button onClick={() => onSubmit(notes)} className='modal-confirm-btn'>
            Submit
          </button>
          <button onClick={onClose} className='modal-cancel-btn'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
const RejectionModal = ({
  show,
  onClose,
  onSubmit,
  reason,
  setReason,
  article,
}) => {
  if (!show) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3>Reject Article</h3>

        {article.submitter_notes && (
          <div className='previous-comment'>
            <h4>Submitter's Notes:</h4>
            <p>{article.submitter_notes}</p>
          </div>
        )}

        <textarea
          placeholder='Provide reason for rejection (required)'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className='modal-notes-input'
          required
        />

        <div className='modal-buttons'>
          <button
            onClick={onSubmit}
            className='modal-confirm-btn'
            disabled={!reason.trim()}
          >
            Confirm Rejection
          </button>
          <button onClick={onClose} className='modal-cancel-btn'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
// const RejectionModal = ({ show, onClose, onSubmit, reason, setReason }) => {
//   if (!show) return null

//   return (
//     <div className='modal-overlay'>
//       <div className='modal-content'>
//         <h3>Reject Article</h3>
//         <textarea
//           placeholder='Provide reason for rejection (required)'
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//           className='modal-notes-input'
//           required
//         />
//         <div className='modal-buttons'>
//           <button
//             onClick={onSubmit}
//             className='modal-confirm-btn'
//             disabled={!reason.trim()}
//           >
//             Confirm Rejection
//           </button>
//           <button onClick={onClose} className='modal-cancel-btn'>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

const AdminBlog = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [showSubmissionModal, setShowSubmissionModal] = useState(false)
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser) fetchArticles()
  }, [currentUser])

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/user')
      setCurrentUser(response.data)
    } catch (err) {
      console.error('Error fetching current user:', err)
    }
  }

  const fetchArticles = async () => {
    try {
      const response = await axios.get('/articles')
      const transformedArticles = response.data.map((article) => ({
        ...article,
        _id: article.id,
        mainImage: article.main_image_url,
        additionalImages: article.additional_image_urls || [],
        statusLabel: getStatusLabel(article.status),
        canEdit: canUserEditArticle(article, currentUser),
        canDelete: canUserDeleteArticle(article, currentUser),
      }))
      setArticles(transformedArticles)
      setError('')
    } catch (err) {
      setError('Failed to fetch articles')
      setArticles([])
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    if (imagePath.startsWith('/storage')) {
      const cleanPath = imagePath.replace(/^\/+/, '')
      return `${
        import.meta.env.VITE_APP_ASSET_URL || window.location.origin
      }/${cleanPath}`
    }
    return imagePath
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'draft':
        return 'Draft'
      case 'pending':
        return 'Pending Approval'
      case 'approved':
        return 'Published'
      case 'rejected':
        return 'Rejected'
      default:
        return status
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FaCheck className='status-icon approved' />
      case 'rejected':
        return <FaTimes className='status-icon rejected' />
      case 'pending':
        return <FaHourglassHalf className='status-icon pending' />
      default:
        return null
    }
  }

  const canUserEditArticle = (article, user) => {
    if (!user) return false
    if (user.role_as === 1) return true
    if (user.role_as === 2) {
      return (
        article.user_id === user.id &&
        ['draft', 'rejected'].includes(article.status)
      )
    }
    return false
  }

  const canUserDeleteArticle = (article, user) => {
    return canUserEditArticle(article, user)
  }

  const handleDelete = async (id) => {
    Swal({
      title: 'Are you sure?',
      text: 'This article will be deleted permanently.',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`/articles/${id}`)
          setArticles(articles.filter((article) => article._id !== id))
          Swal('Deleted!', 'The article has been deleted.', 'success')
        } catch (err) {
          setError('Failed to delete article')
          console.error(err)
          Swal('Error!', 'Failed to delete the article.', 'error')
        }
      }
    })
  }

  const handleSubmitForApproval = async (notes) => {
    try {
      const response = await axios.post(
        `/articles/${selectedArticleId}/submit`,
        { submitter_notes: notes },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.data.message) {
        Swal('Submitted!', response.data.message, 'success')
      }
      fetchArticles()
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Submission failed'
      setError(errorMsg)
      Swal('Error!', errorMsg, 'error')
    } finally {
      setShowSubmissionModal(false)
    }
  }

  const handleApprove = async (articleId) => {
    try {
      await axios.post(`/articles/${articleId}/approve`)
      fetchArticles()
      Swal('Success!', 'Article approved successfully.', 'success')
    } catch (err) {
      setError('Failed to approve article')
      Swal('Error!', 'Failed to approve the article.', 'error')
      console.error(err)
    }
  }

  const handleReject = async () => {
    try {
      await axios.post(`/articles/${selectedArticleId}/reject`, {
        rejection_reason: rejectionReason,
      })
      fetchArticles()
      Swal(
        'Rejected!',
        'Article has been rejected and returned to draft.',
        'success'
      )
    } catch (err) {
      setError('Failed to reject article')
      Swal('Error!', 'Failed to reject the article.', 'error')
      console.error(err)
    } finally {
      setShowRejectionModal(false)
      setRejectionReason('')
    }
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString)
      return isNaN(date.getTime())
        ? 'N/A'
        : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
    } catch (e) {
      return 'N/A'
    }
  }

  if (loading)
    return <div className='admin-blog-loading'>Loading articles...</div>
  if (error) return <div className='admin-blog-error'>{error}</div>

  return (
    <div className='admin-blog-container'>
      <div className='admin-blog-header'>
        <h2>Manage Blog Articles</h2>
        {currentUser?.role_as !== 0 && (
          <Link to='/admin/blog/create' className='admin-blog-create-btn'>
            <FaPlus /> Create New Article
          </Link>
        )}
      </div>

      <div className='admin-blog-list'>
        {articles.length === 0 ? (
          <div className='admin-blog-empty'>
            No articles found.{' '}
            {currentUser?.role_as !== 0 && 'Create your first article!'}
          </div>
        ) : (
          <table className='admin-blog-table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Status</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td>
                    {article.mainImage && (
                      <img
                        src={getImageUrl(article.mainImage)}
                        alt={article.title}
                        className='admin-blog-thumbnail'
                      />
                    )}
                  </td>
                  <td>{article.title}</td>
                  {/* <td className={`status-cell ${article.status}`}>
                    {getStatusIcon(article.status)}
                    {article.statusLabel}
                  </td> */}
                  {/*  Add this to your AdminBlog component, right after the
                  status in the table row */}
                  <td className={`status-cell ${article.status}`}>
                    {getStatusIcon(article.status)}
                    {article.statusLabel}
                    {/* Add this section to show comments */}
                    {(article.submitter_notes || article.rejection_reason) && (
                      <div className='article-comments-tooltip'>
                        <span className='tooltip-icon'>💬</span>
                        <div className='article-comments-content'>
                          {article.submitter_notes && (
                            <div className='submitter-comment'>
                              <strong>Submitter Notes:</strong>
                              <p>{article.submitter_notes}</p>
                            </div>
                          )}
                          {article.rejection_reason && (
                            <div className='rejection-comment'>
                              <strong>Rejection Reason:</strong>
                              <p>{article.rejection_reason}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                  {/*  */}
                  <td>{article.author}</td>
                  <td>{formatDate(article.created_at)}</td>
                  <td>
                    <div className='admin-blog-actions'>
                      {article.canEdit && (
                        <Link
                          to={`/admin/blog/edit/${article._id}`}
                          className='admin-blog-edit-btn'
                        >
                          <FaEdit />
                        </Link>
                      )}
                      {article.canDelete && (
                        <button
                          onClick={() => handleDelete(article._id)}
                          className='admin-blog-delete-btn'
                        >
                          <FaTrash />
                        </button>
                      )}
                      {currentUser?.role_as === 2 &&
                        article.status === 'draft' && (
                          <button
                            onClick={() => {
                              setSelectedArticleId(article._id)
                              setShowSubmissionModal(true)
                            }}
                            className='admin-blog-submit-btn'
                          >
                            Submit for Review
                          </button>
                        )}
                      {currentUser?.role_as === 1 &&
                        article.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(article._id)}
                              className='admin-blog-approve-btn'
                            >
                              <FaCheck /> Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedArticleId(article._id)
                                setShowRejectionModal(true)
                              }}
                              className='admin-blog-reject-btn'
                            >
                              <FaTimes /> Reject
                            </button>
                          </>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <SubmissionModal
        show={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        onSubmit={handleSubmitForApproval}
      />

      <RejectionModal
        show={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onSubmit={handleReject}
        reason={rejectionReason}
        setReason={setRejectionReason}
      />
    </div>
  )
}

export default AdminBlog
