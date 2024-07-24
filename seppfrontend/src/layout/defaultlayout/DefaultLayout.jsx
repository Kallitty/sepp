// import React, { useEffect, useState } from 'react'
// import './defaultlayout.scss'
// import { Sidebar } from '../../components'
// import { useLocation, Navigate, Outlet } from 'react-router-dom'
// import axios from 'axios'

// export default function DefaultLayout() {
//   const location = useLocation()
//   const [user, setUser] = useState(null)

//   // useEffect(() => {
//   //   axios.get('/user').then(({ data }) => {
//   //     setUser(data)
//   //   })
//   // }, [])

//   const isFullScreenQuiz = location.pathname.startsWith('/exam/') // Generalized check for any quiz

//   const onLogout = () => {
//     // Logout logic here
//   }

//   // if (!user) {
//   //   return <Navigate to='/login' />
//   // }

//   return (
//     <div id='defaultLayout'>
//       {!isFullScreenQuiz && (
//         <aside>
//           <Sidebar />
//         </aside>
//       )}
//       <div
//         className='content'
//         style={{ width: isFullScreenQuiz ? '100%' : 'auto' }}
//       >
//         {!isFullScreenQuiz && (
//           <header>
//             {/* <div>Hello {user.name}!</div> */}
//             <div>
//               <a href='#' onClick={onLogout} className='btn-logout'>
//                 Logout
//               </a>
//             </div>
//           </header>
//         )}
//         <main>
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }
