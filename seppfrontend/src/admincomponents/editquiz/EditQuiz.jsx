import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import ClipLoader from 'react-spinners/ClipLoader'
import '../createquiz/createquiz.scss' // Import the SCSS file

const EditQuiz = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [questions, setQuestions] = useState([
    {
      question: '',
      type: '',
      correctAnswer: '',
      choices: ['', '', '', ''],
      icon: null,
    },
  ])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [imageChanged, setImageChanged] = useState({})
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/view-quizzes/${id}`)
        const quizData = response.data
        setTitle(quizData.title || '')
        setDuration(quizData.duration || '')
        setQuestions(
          quizData.questions.map((q) => ({
            ...q,
            icon: q.icon ? q.icon : '',
          }))
        )
      } catch (error) {
        console.error('Error fetching quiz:', error)
      }
    }

    fetchQuiz()
  }, [id])

  const handleChange = (e, index, field) => {
    const values = [...questions]
    if (field === 'icon') {
      values[index][field] = e.target.files[0]
      setImageChanged((prev) => ({ ...prev, [index]: true })) // Mark image as changed
    } else {
      values[index][field] = e.target.value
    }
    setQuestions(values)
  }

  const handleChoiceChange = (e, qIndex, cIndex) => {
    const values = [...questions]
    values[qIndex].choices[cIndex] = e.target.value
    setQuestions(values)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        type: '',
        correctAnswer: '',
        choices: ['', '', '', ''],
        icon: null,
      },
    ])
    setCurrentQuestionIndex(questions.length)
  }

  const deleteQuestion = (index) => {
    setQuestionToDelete(index)
    setShowDeleteConfirmation(true)
  }

  const confirmDelete = () => {
    if (questionToDelete !== null) {
      const values = [...questions]
      values.splice(questionToDelete, 1)
      setQuestions(values)

      if (currentQuestionIndex > 0 && currentQuestionIndex >= values.length) {
        setCurrentQuestionIndex(values.length - 1)
      }

      setShowDeleteConfirmation(false)
      setQuestionToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteConfirmation(false)
    setQuestionToDelete(null)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const removeImage = (index) => {
    const values = [...questions]
    values[index].icon = null // Clear the icon for the current question
    setQuestions(values)
    setImageChanged((prev) => ({ ...prev, [index]: true })) // Mark image as changed
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('duration', duration)

    questions.forEach((question, index) => {
      formData.append(`questions[${index}][question]`, question.question)
      formData.append(`questions[${index}][type]`, question.type)
      formData.append(
        `questions[${index}][correctAnswer]`,
        question.correctAnswer
      )

      question.choices.forEach((choice, choiceIndex) => {
        formData.append(`questions[${index}][choices][${choiceIndex}]`, choice)
      })

      // Only append the icon if it has been changed
      if (imageChanged[index] && question.icon instanceof File) {
        formData.append(`questions[${index}][icon]`, question.icon)
      } else if (question.icon) {
        // Retain the existing image path
        formData.append(`questions[${index}][icon]`, question.icon)
      }
    })

    try {
      const response = await axios.post(`/update-quizzes/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('Response data:', response.data)
      swal('Success', 'Quiz updated successfully!', 'success').then(() => {
        navigate('/admin/update-quiz')
      })
    } catch (error) {
      console.error('Error:', error)
      let errorMessage = 'An error occurred. Please try again later.'

      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Unauthorized. Please log in and try again.'
            break
          case 403:
            errorMessage =
              'Forbidden. You do not have permission to perform this action.'
            break
          case 404:
            errorMessage = 'Not Found. The requested resource was not found.'
            break
          case 405:
            errorMessage =
              'Method Not Allowed. Please check the request method.'
            break
          case 422:
            errorMessage = Object.values(error.response.data.errors)
              .flat()
              .join('\n')
            break
          case 500:
            errorMessage =
              'Internal Server Error. Please contact the support team.'
            break
          default:
            errorMessage = error.response.data.message || errorMessage
            break
        }
      }

      swal('Error', errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className='sepp__quiz-container'>
          <div className='form-fields'>
            <div className='form-group'>
              <label>Title:</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='title-input'
              />
            </div>

            {questions.length > 0 && (
              <div className='form-group'>
                <label>Question {currentQuestionIndex + 1}</label>
                <textarea
                  value={questions[currentQuestionIndex].question}
                  onChange={(e) =>
                    handleChange(e, currentQuestionIndex, 'question')
                  }
                />
                <label>Type:</label>
                <input
                  type='text'
                  value={questions[currentQuestionIndex].type}
                  onChange={(e) =>
                    handleChange(e, currentQuestionIndex, 'type')
                  }
                />
                <label>Correct Answer:</label>
                <input
                  type='text'
                  value={questions[currentQuestionIndex].correctAnswer}
                  onChange={(e) =>
                    handleChange(e, currentQuestionIndex, 'correctAnswer')
                  }
                />
                <label>Choices:</label>
                <div className='choices-group'>
                  {questions[currentQuestionIndex].choices.map(
                    (choice, cIndex) => (
                      <div key={cIndex} className='choice'>
                        <input
                          type='text'
                          value={choice}
                          onChange={(e) =>
                            handleChoiceChange(e, currentQuestionIndex, cIndex)
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
            <div className='button-group'>
              {currentQuestionIndex > 0 && (
                <button type='button' onClick={previousQuestion}>
                  Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <button type='button' onClick={nextQuestion}>
                  Next
                </button>
              )}
              {currentQuestionIndex === questions.length - 1 && (
                <button type='button' onClick={addQuestion}>
                  Add Question
                </button>
              )}
              {questions.length > 1 && (
                <button
                  type='button'
                  onClick={() => deleteQuestion(currentQuestionIndex)}
                >
                  Delete Question
                </button>
              )}
              <button type='submit' disabled={loading}>
                {loading ? (
                  <ClipLoader size={20} color={'#fff'} loading={loading} />
                ) : (
                  'Update Quiz'
                )}
              </button>
            </div>
          </div>
          <div className='side-panel'>
            <div className='form-group'>
              <label>Duration (minutes):</label>
              <input
                type='number'
                value={duration}
                onChange={(e) => {
                  const value = Math.max(0, e.target.value)
                  setDuration(value)
                }}
                className='duration-input'
              />

              <span>
                <label>Icon (optional):</label>
                <input
                  type='file'
                  onChange={(e) =>
                    handleChange(e, currentQuestionIndex, 'icon')
                  }
                  accept='image/*'
                />
              </span>
            </div>
            <div className='icon-preview-container'>
              {questions[currentQuestionIndex].icon && (
                <div className='icon-preview-wrapper'>
                  <img
                    src={
                      questions[currentQuestionIndex].icon instanceof File
                        ? URL.createObjectURL(
                            questions[currentQuestionIndex].icon
                          )
                        : questions[currentQuestionIndex].icon
                    }
                    alt='Question Icon'
                    className='icon-preview'
                  />
                  <button
                    type='button'
                    className='remove-icon-button'
                    onClick={() => removeImage(currentQuestionIndex)}
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          </div>
          {showDeleteConfirmation && (
            <div className='delete-confirmation-modal'>
              <div className='delete-confirmation-content'>
                <p>Are you sure you want to delete this question?</p>
                <div className='delete-confirmation-buttons'>
                  <button
                    className='confirm-delete-button'
                    onClick={confirmDelete}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className='cancel-delete-button'
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default EditQuiz
