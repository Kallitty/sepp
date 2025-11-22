import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './tutorials.scss'
import { ClipLoader } from 'react-spinners'

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        // Simulating API response:
        // For testing the data view, uncomment the 'real' data below.
        // For testing the empty state, keep the empty array.

        // --- Dummy Data (UNCOMMENT TO TEST DATA VIEW) ---
        const response = {
          data: [
            {
              id: 1,
              title: 'Getting Started with the Dashboard',
              duration: 15,
            },
            { id: 2, title: 'Understanding Your Exam Results', duration: 10 },
            { id: 3, title: 'Setting Up Notifications', duration: 7 },
            { id: 4, title: 'Advanced Quiz Taking Strategies', duration: 22 },
          ],
        }
        // --- Dummy Data End ---

        // --- Empty/Error Handling (COMMENT OUT FOR DATA VIEW) ---
        // const response = await axios.get('/tutorials')
        // --- Empty/Error Handling End ---

        setTutorials(response.data)
      } catch (error) {
        console.error('Error fetching tutorials:', error)
        // Optionally set a friendly error message state here
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [])

  if (loading) {
    return (
      <div className='tutorials__loading-container'>
        <ClipLoader size={50} color={'#5a3a56'} />
      </div>
    )
  }

  if (tutorials.length === 0) {
    return (
      <div className='tutorials__empty-state'>
        <div className='tutorials__empty-icon'>
          <FaPlayCircle />
        </div>
        <h3 className='tutorials__empty-title'>No Tutorials Available Yet</h3>
        <p className='tutorials__empty-message'>
          Once new tutorials are added, they will appear here. Check back soon
          for guided lessons and helpful walkthroughs.
        </p>
      </div>
    )
  }

  return (
    <div className='tutorials__container'>
      <h2 className='tutorials__main-header'>
        Guided Tutorials & Walkthroughs
      </h2>

      <div className='tutorials__grid'>
        {tutorials.map((tutorial) => (
          <Link
            to={`/tutorial/${tutorial.id}`}
            key={tutorial.id}
            className='tutorials__card'
          >
            <div className='tutorials__icon'>
              <FaPlayCircle />
            </div>

            <div className='tutorials__content'>
              <div className='tutorials__title'>{tutorial.title}</div>

              <div className='tutorials__duration'>
                {tutorial.duration || 'N/A'} Minutes
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Tutorials
