import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import './updatequiz.scss'

const UpdateQuiz = () => {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzesindex')
        setQuizzes(response.data)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      }
    }

    fetchQuizzes()
  }, [])

  const handleDelete = async (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this quiz!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`/quizzes/${id}`)
          setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
          swal('Poof! Your quiz has been deleted!', {
            icon: 'success',
          })
        } catch (error) {
          console.error('Error deleting quiz:', error)
          swal('Error', 'Failed to delete quiz', 'error')
        }
      }
    })
  }

  const toggleVisibility = async (id, currentVisibility) => {
    try {
      const response = await axios.patch(`/quizzes/${id}/visibility`, {
        is_visible: !currentVisibility,
      })
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.id === id ? { ...quiz, is_visible: !currentVisibility } : quiz
        )
      )
    } catch (error) {
      console.error('Error toggling visibility:', error)
      swal('Error', 'Failed to update quiz visibility', 'error')
    }
  }

  return (
    <div className='sepp__update-quizes'>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className='sepp__update-quiz__quiz'>
          <div className='sepp__update-quiz--detail'>
            <div className='sepp__update-quiz--name'>
              <h5 className='sepp__update-quiz--title'>{quiz.title}</h5>
              <span
                className={`sepp__update-quiz--status ${
                  quiz.is_visible ? 'visible' : 'hidden'
                }`}
              >
                {quiz.is_visible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>
          <div className='sepp__update-quiz--action'>
            <button
              onClick={() => toggleVisibility(quiz.id, quiz.is_visible)}
              className={`sepp__update-quiz--toggle ${
                quiz.is_visible ? 'visible' : 'hidden'
              }`}
            >
              {quiz.is_visible ? 'Hide' : 'Show'}
            </button>
            <Link
              to={`/admin/edit-title/${quiz.id}`}
              className='sepp__update-quiz--edit'
            >
              Edit Title
            </Link>
            <Link
              to={`/admin/edit-quiz/${quiz.id}`}
              className='sepp__update-quiz--edit'
            >
              Edit Q & A
            </Link>
            <Link
              to={`/admin/display-quiz/${quiz.id}`}
              className='sepp__update-quiz--edit'
            >
              Display Quiz
            </Link>

            <button
              onClick={() => handleDelete(quiz.id)}
              className='sepp__update-quiz--delete'
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UpdateQuiz

// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import swal from 'sweetalert'
// import './updatequiz.scss'

// const UpdateQuiz = () => {
//   const [quizzes, setQuizzes] = useState([])

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('/quizzes')
//         setQuizzes(response.data)
//       } catch (error) {
//         console.error('Error fetching quizzes:', error)
//       }
//     }

//     fetchQuizzes()
//   }, [])

//   const handleDelete = async (id) => {
//     swal({
//       title: 'Are you sure?',
//       text: 'Once deleted, you will not be able to recover this quiz!',
//       icon: 'warning',
//       buttons: true,
//       dangerMode: true,
//     }).then(async (willDelete) => {
//       if (willDelete) {
//         try {
//           await axios.delete(`/quizzes/${id}`)
//           setQuizzes(quizzes.filter((quiz) => quiz.id !== id))
//           swal('Poof! Your quiz has been deleted!', {
//             icon: 'success',
//           })
//         } catch (error) {
//           console.error('Error deleting quiz:', error)
//           swal('Error', 'Failed to delete quiz', 'error')
//         }
//       }
//     })
//   }

//   return (
//     <div className='sepp__update-quizes'>
//       {quizzes.map((quiz) => (
//         <div key={quiz.id} className='sepp__update-quiz__quiz'>
//           <div className='sepp__update-quiz--detail'>
//             <div className='sepp__update-quiz--name'>
//               <h5 className='sepp__update-quiz--title'>{quiz.title}</h5>
//             </div>
//           </div>
//           <div className='sepp__update-quiz--action'>
//             <Link
//               to={`/admin/edit-title/${quiz.id}`}
//               className='sepp__update-quiz--edit'
//             >
//               Edit Title
//             </Link>
//             <Link
//               to={`/admin/edit-quiz/${quiz.id}`}
//               className='sepp__update-quiz--edit'
//             >
//               Edit Q & A
//             </Link>
//             <Link
//               to={`/admin/display-quiz/${quiz.id}`}
//               className='sepp__update-quiz--edit'
//             >
//               Display Quiz
//             </Link>

//             <button
//               onClick={() => handleDelete(quiz.id)}
//               className='sepp__update-quiz--delete'
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default UpdateQuiz
