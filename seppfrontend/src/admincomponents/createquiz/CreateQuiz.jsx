import React, { useState } from 'react'
import axios from 'axios'
import './createquiz.scss' // Import the SCSS file
import swal from 'sweetalert'
import ClipLoader from 'react-spinners/ClipLoader'

const CreateQuiz = () => {
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
  const [loading, setLoading] = useState(false) // Add loading state

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true) // Set loading to true when form is submitted

    const formData = new FormData()
    formData.append('title', title)
    formData.append('duration', duration) // Append duration to formData
    questions.forEach((question, index) => {
      formData.append(`questions[${index}][question]`, question.question)
      formData.append(`questions[${index}][type]`, question.type)
      formData.append(
        `questions[${index}][correctAnswer]`,
        question.correctAnswer
      )

      // Append each choice individually
      question.choices.forEach((choice, choiceIndex) => {
        formData.append(`questions[${index}][choices][${choiceIndex}]`, choice)
      })

      if (question.icon) {
        formData.append(`questions[${index}][icon]`, question.icon)
      }
    })

    axios
      .post('/api/create-quiz', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        swal('Success', 'Quiz created successfully!', 'success')
      })
      .catch((error) => {
        console.error(error)
        swal('Error', 'Failed to create quiz', 'error')
      })
      .finally(() => {
        setLoading(false) // Set loading to false when request is completed
      })
  }

  return (
    <div>
      <h2>Create a Quiz</h2>
      <div className='sepp__quiz-container'>
        <div className='form-fields'>
          <form onSubmit={handleSubmit}>
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
                  'Create Quiz'
                )}
              </button>
            </div>
          </form>
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
                onChange={(e) => handleChange(e, currentQuestionIndex, 'icon')}
                accept='image/*'
              />
            </span>
          </div>
          <div className='icon-preview-container'>
            {questions[currentQuestionIndex].icon && (
              <img
                src={URL.createObjectURL(questions[currentQuestionIndex].icon)}
                alt='Question Icon'
                className='icon-preview'
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuiz
