import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import './edittitle.scss' // Assuming you have a stylesheet for this component

const EditTitle = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/view-quizzes/${id}`)
        const quizData = response.data
        setTitle(quizData.title || '') // Ensure title is not undefined
      } catch (error) {
        console.error('Error fetching quiz:', error)
      }
    }

    fetchQuiz()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`/update-quizzes/${id}`, { title })
      console.log(response.data)
      swal('Success', 'Title updated successfully!', 'success').then(() => {
        navigate('/admin/update-quiz')
      })
    } catch (error) {
      console.error('Error updating title:', error)
      swal('Error', 'Failed to update title', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='sepp__edit-title'>
      <h2>Edit Quiz Title</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Update Title'}
        </button>
      </form>
    </div>
  )
}

export default EditTitle
