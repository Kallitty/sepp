import React, { useEffect, useState } from 'react'
import { BiBook } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './quizlist.scss'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quizzes') // Update endpoint
        setQuizzes(response.data)
      } catch (error) {
        console.error('Error fetching quizzes:', error)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className='sepp__profile-quizes'>
      {quizzes.map((quiz) => (
        <Link
          to={`/exam/${quiz.id}`}
          className='sepp__profile-quiz__quiz'
          key={quiz.id}
        >
          <div className='sepp__profile-quiz--detail'>
            <div className='sepp__profile-quiz--icon'>
              <BiBook />
            </div>
            <div className='sepp__profile-quiz--name'>
              <h5 className='sepp__profile-quiz--title'>{quiz.title}</h5>
              <span className='sepp__profile-quiz--duration'>
                {quiz.duration} Minute(s)
              </span>
            </div>
          </div>
          <div className='sepp__profile-quiz--action'>|</div>
        </Link>
      ))}
    </div>
  )
}

export default QuizList

// import React, { useEffect, useState } from 'react'
// import { BiBook } from 'react-icons/bi'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import './quizlist.scss'

// const QuizList = () => {
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

//   return (
//     <div className='sepp__profile-quizes'>
//       {quizzes.map((quiz) => (
//         <Link
//           to={`/exam/${quiz.id}`}
//           className='sepp__profile-quiz__quiz'
//           key={quiz.id}
//         >
//           <div className='sepp__profile-quiz--detail'>
//             <div className='sepp__profile-quiz--icon'>
//               <BiBook />
//             </div>
//             <div className='sepp__profile-quiz--name'>
//               <h5 className='sepp__profile-quiz--title'>{quiz.title}</h5>
//               <span className='sepp__profile-quiz--duration'>
//                 {quiz.duration} Minute(s)
//               </span>
//             </div>
//           </div>
//           <div className='sepp__profile-quiz--action'>|</div>
//         </Link>
//       ))}
//     </div>
//   )
// }

// export default QuizList
