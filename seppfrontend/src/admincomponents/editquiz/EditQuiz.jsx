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

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quizzes/${id}`)
        const quizData = response.data
        setTitle(quizData.title || '')
        setDuration(quizData.duration || '')
        setQuestions(
          quizData.questions.map((q) => ({
            ...q,
            icon: q.icon ? q.icon : null,
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
    const values = [...questions]
    values.splice(index, 1)
    setQuestions(values)
    if (currentQuestionIndex > 0 && currentQuestionIndex >= values.length) {
      setCurrentQuestionIndex(values.length - 1)
    }
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

      if (question.icon) {
        formData.append(`questions[${index}][icon]`, question.icon)
      }
    })

    try {
      const response = await axios.put(`/quizzes/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Response data:', response.data)
      swal('Success', 'Quiz updated successfully!', 'success').then(() => {
        navigate('/admin/update-quiz')
      })
    } catch (error) {
      console.error('Error:', error)
      swal('Error', 'Failed to update quiz', 'error')
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
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditQuiz
