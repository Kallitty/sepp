import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './allresult.scss'
import { ClipLoader } from 'react-spinners'

const AllResult = () => {
  const [loading, setLoading] = useState(true)
  const [scores, setScores] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  useEffect(() => {
    axios
      .get('/allquiz-results') // Fetch results from the admin endpoint
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
      <div className='loading-container'>
        <ClipLoader size={50} color={' #470647'} loading={loading} />
      </div>
    )
  }

  return (
    <div className='result-container'>
      <h2>Master Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
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
              <td>{score.user_name}</td> {/* Display user name */}
              <td>{score.user_email}</td> {/* Display user email */}
              <td>{score.quiz_title}</td> {/* Display quiz title */}
              <td>{score.quiz_id}</td>
              <td>{score.score}</td>
              <td>{score.correct_answers}</td>
              <td>{score.wrong_answers}</td>
              <td>{score.correct_answers_percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination-container'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <ul className='pagination'>{renderPageNumbers}</ul>
        <button
          onClick={handleNext}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllResult
