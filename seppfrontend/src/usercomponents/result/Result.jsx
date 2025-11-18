import React, { useEffect, useState } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import axios from 'axios'
import './result.scss'
import { ClipLoader } from 'react-spinners'

const Result = () => {
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  useEffect(() => {
    axios
      .get('/user-quiz-results')
      .then((res) => {
        if (res.data.status === 200) {
          setScores(res.data.results)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('There was an error fetching the quiz results!', error)
        swal('Error', 'Failed to fetch quiz results', 'error')
        setLoading(false)
      })
  }, [])

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id))
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers.length))
  }

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  // Logic for displaying current scores
  const indexOfLastScore = currentPage * resultsPerPage
  const indexOfFirstScore = indexOfLastScore - resultsPerPage
  const currentScores = scores.slice(indexOfFirstScore, indexOfLastScore)

  // Logic for displaying page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(scores.length / resultsPerPage); i++) {
    pageNumbers.push(i)
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? 'active' : ''}
      >
        {number}
      </li>
    )
  })

  if (loading) {
    return (
      <div className='result__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} loading={loading} />
      </div>
    )
  }

  if (scores.length === 0) {
    return (
      <div className='result__empty-state'>
        <div className='result__empty-icon'>
          <FaClipboardList />
        </div>
        <h3 className='result__empty-title'>No Results Found</h3>
        <p className='result__empty-message'>
          Kindly take an exam to see your result(s) here.
        </p>
      </div>
    )
  }

  return (
    <div className='result__container'>
      <h3 className='result__header'>Scoreboard</h3>
      <div className='result__table-wrapper'>
        <table className='result__table'>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Quiz Title</th>
              <th>Quiz ID</th>
              <th>Score</th>
              <th>Correct Answers</th>
              <th>Wrong Answers</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {currentScores.map((score, index) => (
              <tr key={score.id}>
                <td>{indexOfFirstScore + index + 1}</td>
                <td>{score.quiz_title}</td>
                <td>{score.quiz_id}</td>
                <td>{score.score}</td>
                <td>{score.correct_answers}</td>
                <td>{score.wrong_answers}</td>
                <td>{score.correct_answers_percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='result__pagination-container'>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className='result__pagination-button'
        >
          Previous
        </button>
        <ul className='result__pagination'>{renderPageNumbers}</ul>
        <button
          onClick={handleNext}
          disabled={currentPage === pageNumbers.length}
          className='result__pagination-button'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Result
