import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../home/Home'
import Login from '../containers/login/Login'
import Signup from '../containers/signup/Signup'
import ForgotPassword from '../containers/forgotpassword/ForgotPassword'
import PasswordReset from '../containers/passwordreset/PasswordReset'
import Dashboard from '../admincomponents/dashboard/Dashboard'
import Profile from '../admincomponents/profile/Profile'
import AdminPrivateRoute from './AdminPrivateRoute'
import UserRoute from './UserRoute'
import Board from '../containers/board/Board'
import BoardOutlet from '../boardoutlet/BoardOutlet'
import NotFound from '../display/notfound/NotFound'
import Result from '../display/result/Result'
import Exam from '../exam/Exam'
import Library from '../containers/library/Library'
import Whatsepp from '../containers/whatissepp/Whatsepp'
import ContactUs from '../containers/contactus/ContactUs'
import Donations from '../containers/donations/Donations'
import PublicRoute from '../routes/PublicRoute'
import CreateQuiz from '../admincomponents/createquiz/CreateQuiz'
import UpdateQuiz from '../admincomponents/updatequiz/UpdateQuiz'
import EditQuiz from '../admincomponents/editquiz/EditQuiz'
import EditTitle from '../admincomponents/edittitle/EditTitle'
import AllResult from '../admincomponents/results/AllResult'

const isAuthenticated = () => !!localStorage.getItem('auth_token')

const routes = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute isAuthenticated={isAuthenticated()} />,
    children: [
      { path: '/', element: <Navigate to='/home' /> },
      { path: 'home', element: <Home /> },
      { path: 'library', element: <Library /> },
      { path: 'wsepp', element: <Whatsepp /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'donations', element: <Donations /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'password/reset/:token', element: <PasswordReset /> },
    ],
  },
  {
    path: '/*',
    element: <UserRoute />,
    children: [
      {
        path: 'boardoutlet/*',
        element: <BoardOutlet />,
        children: [
          { path: '', element: <Board /> },
          { path: 'result', element: <Result /> },
        ],
      },
      { path: 'exam/:quizId', element: <Exam /> },
    ],
  },
  {
    path: '/admin/*',
    element: <AdminPrivateRoute />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'create-quiz', element: <CreateQuiz /> },
      { path: 'update-quiz', element: <UpdateQuiz /> },
      { path: 'edit-quiz/:id', element: <EditQuiz /> },
      { path: 'edit-title/:id', element: <EditTitle /> },
      { path: 'allresult', element: <AllResult /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])

export default routes
