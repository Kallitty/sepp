import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import './adminarticleform.scss'
import Swal from 'sweetalert'

const AdminArticleForm = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    submitter_notes: '',
    slug: '',
    status: '',
  })
  const [mainImage, setMainImage] = useState(null)
  const [mainImagePreview, setMainImagePreview] = useState('')
  const [additionalImages, setAdditionalImages] = useState([])
  const [additionalImagesPreviews, setAdditionalImagesPreviews] = useState([])
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/user')
        setCurrentUser(response.data)
        if (!isEditMode) {
          setFormData((prev) => ({
            ...prev,
            author: response.data.name,
          }))
        }
      } catch (err) {
        console.error('Error fetching current user:', err)
      }
    }

    fetchCurrentUser()

    if (isEditMode) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`/articles/${id}`)
          const article = response.data

          setFormData({
            title: article.title,
            content: article.content,
            author: article.author,
            submitter_notes: article.submitter_notes || '',
            slug: article.slug || '',
            status: article.status || 'draft',
          })

          if (article.main_image_url) {
            setMainImagePreview(article.main_image_url)
          }

          if (article.additional_image_urls?.length > 0) {
            setExistingAdditionalImages(article.additional_image_urls)
          }
        } catch (error) {
          console.error('Error fetching article:', error)
          showErrorAlert('Failed to load article data')
        }
      }
      fetchArticle()
    }
  }, [id, isEditMode])

  const showErrorAlert = (message) => {
    Swal('Error', message, 'error')
    navigate('/admin/blog')
  }

  const showSuccessAlert = (message) => {
    Swal('Success', message, 'success')
    navigate('/admin/blog')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleMainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMainImage(file)
      setMainImagePreview(URL.createObjectURL(file))
      if (errors.mainImage) {
        setErrors((prev) => ({ ...prev, mainImage: '' }))
      }
    }
  }

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setAdditionalImages(files)
    setAdditionalImagesPreviews(files.map((file) => URL.createObjectURL(file)))
  }

  const removeAdditionalImage = (index) => {
    const updatedPreviews = [...additionalImagesPreviews]
    updatedPreviews.splice(index, 1)
    setAdditionalImagesPreviews(updatedPreviews)

    const updatedImages = [...additionalImages]
    updatedImages.splice(index, 1)
    setAdditionalImages(updatedImages)
  }

  const removeExistingAdditionalImage = (index) => {
    const updatedImages = [...existingAdditionalImages]
    updatedImages.splice(index, 1)
    setExistingAdditionalImages(updatedImages)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const data = new FormData()
    data.append('title', formData.title)
    data.append('content', formData.content)
    data.append('author', formData.author)
    data.append('submitter_notes', formData.submitter_notes)

    // Fix: Always set status to 'draft' when saving (for contributors)
    // Only admins can directly publish
    const statusToSend = currentUser?.role_as === 1 ? 'approved' : 'draft'
    data.append('status', statusToSend)

    if (mainImage) {
      data.append('mainImage', mainImage)
    }

    additionalImages.forEach((image) => {
      data.append('additionalImages[]', image)
    })

    existingAdditionalImages.forEach((imageUrl) => {
      data.append('existingAdditionalImages[]', imageUrl)
    })

    try {
      const url = isEditMode ? `/articles/${id}` : '/articles'
      const method = isEditMode ? 'post' : 'post' // Changed to 'put' for edits

      const response = await axios[method](url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const successMessage = isEditMode
        ? 'Article updated successfully!'
        : currentUser?.role_as === 1
        ? 'Article published successfully!'
        : 'Article saved as draft.'

      showSuccessAlert(successMessage)
    } catch (error) {
      console.error('Error:', error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
      showErrorAlert(
        error.response?.data?.message ||
          (isEditMode
            ? 'Error updating article. Please try again.'
            : 'Error creating article. Please try again.')
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)
  //   setErrors({})
  //   console.log('Current user role:', currentUser?.role_as)

  //   const data = new FormData()
  //   data.append('title', formData.title)
  //   data.append('content', formData.content)
  //   data.append('author', formData.author)
  //   data.append('submitter_notes', formData.submitter_notes)

  //   // Debug: Check what status we're sending
  //   const statusToSend =
  //     currentUser?.role_as == 1 ? 'approved' : formData.status
  //   console.log('Sending status:', statusToSend)
  //   data.append('status', statusToSend)

  //   if (mainImage) {
  //     data.append('mainImage', mainImage)
  //   }

  //   additionalImages.forEach((image) => {
  //     data.append('additionalImages[]', image)
  //   })

  //   existingAdditionalImages.forEach((imageUrl) => {
  //     data.append('existingAdditionalImages[]', imageUrl)
  //   })

  //   // Debug: Log all FormData entries
  //   for (let [key, value] of data.entries()) {
  //     console.log(key, value)
  //   }

  //   try {
  //     const url = isEditMode ? `/articles/${id}` : '/articles'
  //     const method = isEditMode ? 'post' : 'post'

  //     const response = await axios[method](url, data, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })

  //     console.log('Response:', response) // Debug response

  //     const successMessage = isEditMode
  //       ? 'Article updated successfully!'
  //       : currentUser?.role_as == 1
  //       ? 'Article created successfully!'
  //       : 'Article submitted for approval.'
  //     showSuccessAlert(successMessage)
  //   } catch (error) {
  //     console.error('Error:', error)
  //     console.log('Error response:', error.response)
  //     showErrorAlert(
  //       error.response?.data?.message ||
  //         (isEditMode
  //           ? 'Error updating article. Please try again.'
  //           : 'Error creating article. Please try again.')
  //     )
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const handleSubmitForApproval = async () => {
    try {
      const response = await axios.post(`/articles/${id}/submit`, {
        submitter_notes: formData.submitter_notes,
      })

      // Update local state to reflect new status
      setFormData((prev) => ({
        ...prev,
        status: 'pending',
        submitter_notes: response.data.article.submitter_notes,
      }))

      showSuccessAlert('Article submitted for approval!')
    } catch (error) {
      console.error('Error submitting for approval:', error)
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
      showErrorAlert(
        error.response?.data?.message || 'Failed to submit for approval'
      )
    }
  }

  return (
    <div className='admin-article-form'>
      <h2 className='admin-article-form__title'>
        {isEditMode ? 'Edit Article' : 'Create New Article'}
      </h2>

      <form onSubmit={handleSubmit} className='admin-article-form__form'>
        <div className='admin-article-form__group'>
          <label className='admin-article-form__label'>Title *</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            className={`admin-article-form__input ${
              errors.title ? 'admin-article-form__input--error' : ''
            }`}
          />
          {errors.title && (
            <span className='admin-article-form__error-message'>
              {errors.title}
            </span>
          )}
        </div>

        <div className='admin-article-form__group'>
          <label className='admin-article-form__label'>Content *</label>
          <textarea
            name='content'
            value={formData.content}
            onChange={handleChange}
            rows='10'
            className={`admin-article-form__textarea ${
              errors.content ? 'admin-article-form__textarea--error' : ''
            }`}
          />
          {errors.content && (
            <span className='admin-article-form__error-message'>
              {errors.content}
            </span>
          )}
        </div>

        <div className='admin-article-form__group'>
          <label className='admin-article-form__label'>
            Main Image {!isEditMode && '*'}
          </label>
          {mainImagePreview && (
            <div className='admin-article-form__image-preview-container'>
              <img
                src={mainImagePreview}
                alt='Main preview'
                className='admin-article-form__image-preview'
              />
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleMainImageChange}
            required={!isEditMode}
            className={`admin-article-form__file-input ${
              errors.mainImage ? 'admin-article-form__file-input--error' : ''
            }`}
          />
          {errors.mainImage && (
            <span className='admin-article-form__error-message'>
              {errors.mainImage}
            </span>
          )}
        </div>

        <div className='admin-article-form__group'>
          <label className='admin-article-form__label'>
            Additional Images (Optional)
          </label>

          {isEditMode && existingAdditionalImages.length > 0 && (
            <div className='admin-article-form__existing-images'>
              <h4>Existing Images</h4>
              <div className='admin-article-form__image-previews'>
                {existingAdditionalImages.map((src, index) => (
                  <div
                    key={`existing-${index}`}
                    className='admin-article-form__image-preview-wrapper'
                  >
                    <img
                      src={src}
                      alt={`Existing ${index}`}
                      className='admin-article-form__image-preview'
                    />
                    <button
                      type='button'
                      className='admin-article-form__remove-image-btn'
                      onClick={() => removeExistingAdditionalImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {additionalImagesPreviews.length > 0 && (
            <div className='admin-article-form__new-images'>
              <h4>New Images</h4>
              <div className='admin-article-form__image-previews'>
                {additionalImagesPreviews.map((src, index) => (
                  <div
                    key={`new-${index}`}
                    className='admin-article-form__image-preview-wrapper'
                  >
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className='admin-article-form__image-preview'
                    />
                    <button
                      type='button'
                      className='admin-article-form__remove-image-btn'
                      onClick={() => removeAdditionalImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input
            type='file'
            accept='image/*'
            multiple
            onChange={handleAdditionalImagesChange}
            className='admin-article-form__file-input'
          />
        </div>

        {currentUser?.role_as == 2 && (
          <div className='admin-article-form__group'>
            <label className='admin-article-form__label'>
              Notes for Reviewer (Optional)
            </label>
            <textarea
              name='submitter_notes'
              value={formData.submitter_notes}
              onChange={handleChange}
              className='admin-article-form__textarea'
              placeholder='Add any notes for the reviewer...'
            />
          </div>
        )}

        <div className='admin-article-form__button-group'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`admin-article-form__submit-btn ${
              isSubmitting ? 'admin-article-form__submit-btn--submitting' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <span className='admin-article-form__spinner'></span>
                {isEditMode ? 'Saving...' : 'Saving...'}
              </>
            ) : isEditMode ? (
              'Save Changes'
            ) : currentUser?.role_as == 2 ? (
              'Save'
            ) : (
              'Publish Article'
            )}
          </button>
          {isEditMode && currentUser?.role_as == 2 && (
            <button
              type='button'
              className='admin-article-form__submit-review-btn'
              onClick={handleSubmitForApproval}
            >
              Submit for Approval
            </button>
          )}
          {/*  In AdminArticleForm.js, add this section near the notes input */}
          {isEditMode && (
            <div className='admin-article-form__comments-section'>
              {formData.rejection_reason && (
                <div className='admin-article-form__comment admin-article-form__comment--rejection'>
                  <h4>Rejection Reason</h4>
                  <p>{formData.rejection_reason}</p>
                  {formData.rejected_at && (
                    <div className='comment-meta'>
                      Rejected on:{' '}
                      {new Date(formData.rejected_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
              {formData.submitter_notes && (
                <div className='admin-article-form__comment admin-article-form__comment--submitter'>
                  <h4>Submission Notes</h4>
                  <p>{formData.submitter_notes}</p>
                  {formData.submitted_at && (
                    <div className='comment-meta'>
                      Submitted on:{' '}
                      {new Date(formData.submitted_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
              {formData.approver_notes && (
                <div className='admin-article-form__comment admin-article-form__comment--approval'>
                  <h4>Approver Notes</h4>
                  <p>{formData.approver_notes}</p>
                  {formData.approved_at && (
                    <div className='comment-meta'>
                      Approved on:{' '}
                      {new Date(formData.approved_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default AdminArticleForm
