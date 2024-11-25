import React, { useState, useEffect } from 'react'
import './quiz.scss'
import { resultInitialState } from '../../initials'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const Quiz = ({ questions: initialQuestions, quizId }) => {
  const [questions, setQuestions] = useState(initialQuestions || [])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [result, setResult] = useState({ ...resultInitialState })
  const [showResult, setShowResult] = useState(false)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [time, setTime] = useState({ minutes: 0, seconds: 0 })
  const [durationInSeconds, setDurationInSeconds] = useState(0)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quizzes/${quizId}`)
        const quiz = response.data
        setQuestions(quiz.questions)
        setSelectedAnswers(new Array(quiz.questions.length).fill(null))
        const durationInSeconds = quiz.duration * 60
        setDurationInSeconds(durationInSeconds)
        setTime({
          minutes: Math.floor(durationInSeconds / 60),
          seconds: durationInSeconds % 60,
        })
      } catch (error) {
        console.error('Error fetching quiz:', error)
      }
    }

    fetchQuiz()
  }, [quizId, initialQuestions])

  useEffect(() => {
    if (durationInSeconds > 0) {
      const countDownTime = Date.now() + durationInSeconds * 1000
      const interval = setInterval(() => {
        const now = new Date().getTime()
        const distance = countDownTime - now
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        if (distance < 0) {
          clearInterval(interval)
          setShowTimeUpModal(true)
        } else {
          setTime({ minutes, seconds })
        }
      }, 1000)

      return () => clearInterval(interval) // Cleanup interval on component unmount
    }
  }, [durationInSeconds])

  const calculateResults = () => {
    const newScore = selectedAnswers.reduce((score, selectedIdx, idx) => {
      const correctAnswer = questions[idx].correctAnswer
        ? questions[idx].correctAnswer.trim()
        : ''
      const correctIdx = questions[idx].choices.findIndex(
        (choice) => choice.trim() === correctAnswer
      )
      return score + (selectedIdx === correctIdx ? 5 : 0)
    }, 0)

    const correctAnswersCount = selectedAnswers.reduce(
      (count, selectedIdx, idx) => {
        const correctAnswer = questions[idx].correctAnswer
          ? questions[idx].correctAnswer.trim()
          : ''
        const correctIdx = questions[idx].choices.findIndex(
          (choice) => choice.trim() === correctAnswer
        )
        return count + (selectedIdx === correctIdx ? 1 : 0)
      },
      0
    )

    const correctAnswersPercentage = (
      (correctAnswersCount / questions.length) *
      100
    ).toFixed(2)

    setResult((prevResult) => ({
      ...prevResult,
      score: newScore,
      correctAnswers: correctAnswersCount,
      wrongAnswers: questions.length - correctAnswersCount,
      correctAnswersPercentage,
    }))

    submitResults({
      quiz_id: quizId,
      score: newScore,
      correctAnswers: correctAnswersCount,
      wrongAnswers: questions.length - correctAnswersCount,
      correctAnswersPercentage,
    })
  }

  const submitResults = (resultData) => {
    axios.post('/store-quiz-results', resultData).then((res) => {
      if (res.data.status === 200) {
        swal('Success.', res.data.message, 'success')
      } else if (res.data.status === 400) {
        swal('Error.', 'There was an error saving your results.', 'error')
      }
    })
  }

  const onTimeUpCloseModal = () => {
    calculateResults()
    setShowTimeUpModal(false)
    setShowResult(true)
  }

  const onAnswerClick = (answer, index) => {
    const updatedSelectedAnswers = [...selectedAnswers]
    updatedSelectedAnswers[currentQuestion] = index
    setSelectedAnswers(updatedSelectedAnswers)
  }

  const handleYesSubmit = () => {
    onTimeUpCloseModal()
  }

  const handleNoCancel = () => {
    setShowConfirmationModal(false)
  }

  const onClickNext = () => {
    setCurrentQuestion((prev) => prev + 1)
  }

  const onFinish = () => {
    setShowConfirmationModal(true)
  }

  const onClickPrevious = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const timerClass =
    time.minutes === 0 && time.seconds <= Math.floor(durationInSeconds * 0.2)
      ? 'red-timer'
      : ''

  return (
    <div className='sepp__quiz-container'>
      {!showResult ? (
        <>
          {questions.map((q, index) => (
            <div
              key={q.id}
              style={{ display: currentQuestion === index ? 'block' : 'none' }}
            >
              <div className='sepp__quiz-heading-flex'>
                <p>
                  <span className='sepp__quiz-active-question-no'>
                    {index + 1}
                  </span>
                  <span className='sepp__quiz-total-question'>
                    /{questions.length}
                  </span>
                </p>
                <p>
                  <span className={`sepp__quiz-timer ${timerClass}`}>
                    {time.minutes}:
                    {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
                  </span>
                  <span className={`sepp__quiz-timer-icon ${timerClass}`}>
                    <AiOutlineClockCircle />
                  </span>
                </p>
              </div>
              {q.icon && (
                <img
                  src={q.icon.startsWith('http') ? q.icon : `/icons/${q.icon}`}
                  alt={`Question ${q.id} icon`}
                  className='sepp__quiz-icon-img'
                />
              )}
              <h2>{q.question}</h2>
              <ul>
                {q.choices.map((answer, idx) => (
                  <li
                    onClick={() => onAnswerClick(answer, idx)}
                    key={answer}
                    className={
                      selectedAnswers[currentQuestion] === idx
                        ? 'sepp__quiz-selected-answer'
                        : null
                    }
                  >
                    {answer}
                  </li>
                ))}
              </ul>
              <div className='sepp__quiz-footer'>
                <button
                  onClick={onClickPrevious}
                  disabled={currentQuestion === 0}
                  className='sepp__quiz-previous-button'
                >
                  Previous
                </button>
                <button
                  className='sepp__quiz-next-button'
                  onClick={
                    currentQuestion === questions.length - 1
                      ? onFinish
                      : onClickNext
                  }
                  disabled={selectedAnswers[currentQuestion] === null}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          ))}

          {showTimeUpModal && (
            <div className='sepp__quiz-timeup-overlay'>
              <div className='sepp__quiz-timeup'>
                <p>Time's up! Click OK to see your results.</p>
                <button
                  className='sepp__quiz-yes-button'
                  onClick={handleYesSubmit}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {showConfirmationModal && (
            <div className='sepp__quiz-modal'>
              <p>Are you sure you want to submit?</p>
              <button
                className='sepp__quiz-yes-button'
                onClick={handleYesSubmit}
              >
                Yes
              </button>
              <button className='sepp__quiz-no-button' onClick={handleNoCancel}>
                No
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='sepp__quiz-result'>
          <h3>Result</h3>
          <p>
            Total Questions:<span> {questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
          <p>
            Percentage of Correct Answers:
            <span> {result.correctAnswersPercentage}%</span>
          </p>
          <button>
            <Link to='/boardoutlet'>Return to my Dashboard</Link>
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
