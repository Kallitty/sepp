import React, { useState, useEffect } from 'react'
import Quiz from '../components/Quiz/Quiz'
import './exam.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Exam = () => {
  const { quizId } = useParams() // Get quizId from URL parameters
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizData, setQuizData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/quizzes/${quizId}`)
        setQuizData(response.data)
      } catch (error) {
        console.error('Error fetching quiz data:', error)
      }
    }

    fetchQuizData()
  }, [quizId])

  const startQuiz = () => {
    setQuizStarted(true)
  }

  const goBack = () => {
    navigate('/boardoutlet')
  }

  return (
    <div className='sepp__exam-skeleton'>
      <div className='sepp__exam--body'>
        {!quizStarted
          ? quizData && (
              <div className='sepp__exam-container'>
                <h2>
                  You are about to take a {quizData.duration} minute(s) quiz.
                </h2>
                <p>Kindly go back if you are not ready.</p>
                <button
                  onClick={startQuiz}
                  className='sepp__exam-start-quiz-btn'
                >
                  Take Quiz
                </button>
                <button onClick={goBack} className='sepp__exam-go-back-btn'>
                  Go Back
                </button>
              </div>
            )
          : quizData && <Quiz questions={quizData.questions} quizId={quizId} />}
      </div>
    </div>
  )
}

export default Exam
