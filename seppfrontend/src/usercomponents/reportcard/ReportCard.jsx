import React, { useEffect, useState } from 'react'
import { FaChartLine } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './reportcard.scss'
import { ClipLoader } from 'react-spinners'

const ReportCard = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes')
        const reportQuizzes = response.data.filter((quiz) =>
          quiz.title.toLowerCase().includes('reportcardd')
        )
        setQuizzes(reportQuizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [])

  if (loading) {
    return (
      <div className='reportCard__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  if (quizzes.length === 0) {
    return (
      <div className='reportCard__empty-state'>
        <div className='reportCard__empty-icon'>
          <FaChartLine />
        </div>
        <h3 className='reportCard__empty-title'>Your Learning Analytics</h3>
        <p className='reportCard__empty-message'>
          Complete more quizzes to unlock your personalized performance report
          card. Your progress dashboard will appear here after you reach a
          landmark on assessments.
        </p>
      </div>
    )
  }

  return (
    <div className='reportCard__container'>
      {quizzes.map((quiz) => (
        <Link
          to={`/exam/${quiz.id}`}
          key={quiz.id}
          className='reportCard__card'
        >
          <div className='reportCard__icon'>
            <FaChartLine />
          </div>
          <div className='reportCard__content'>
            <div className='reportCard__title'>{quiz.title}</div>
            <div className='reportCard__duration'>
              {quiz.duration} Minute(s)
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ReportCard
