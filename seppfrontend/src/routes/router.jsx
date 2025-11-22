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
import Nothing from '../display/nothing/Nothing'
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
import VisitorTab from '../admincomponents/visitortab/VisitorTab'
import UserActivityTab from '../admincomponents/useractivitytab/UserActivityTab'
import UserInbox from '../containers/userinbox/UserInbox'
import MessageCenter from '../admincomponents/messagecenter/MessageCenter'
import Result from '../usercomponents/result/Result'
import Job from '../usercomponents/job/Job'
import Jamb from '../usercomponents/jamb/Jamb'
import Waec from '../usercomponents/waec/Waec'
import Neco from '../usercomponents/neco/Neco'
import Nabteb from '../usercomponents/nabteb/Nabteb'
import Certificate from '../usercomponents/certificate/Certifcate'
import ReportCard from '../usercomponents/reportcard/ReportCard'
import FAQ from '../containers/faq/FAQ'
import Blog from '../containers/blog/Blog'
import TAC from '../containers/tac/TAC'
import PrivacyPolicy from '../containers/privacypolicy/PrivacyPolicy'
import ArticleDetail from '../components/articledetail/ArticleDetail'
import AdminBlog from '../admincomponents/adminblog/AdminBlog'
import AdminArticleForm from '../admincomponents/adminarticleform/AdminArticleForm'
import ContactMessage from '../admincomponents/contactmessage/ContactMessage'

import {
  startInactivityTimer,
  clearInactivityTimer,
} from '../services/inactivityService'
import FAQS from '../usercomponents/faqs/Faqs'
import Tutorials from '../usercomponents/tutorials/Tutorials'
import ReportIssue from '../usercomponents/reportissue/ReportIssue'
import ContactSupport from '../usercomponents/contactsupport/ContactSupport'

// In your router.jsx, modify the isAuthenticated function
const isAuthenticated = () => {
  const token = localStorage.getItem('auth_token')
  if (!token) {
    // Clear timer if no token exists
    clearInactivityTimer()
    return false
  }
  return true
}

const routes = createBrowserRouter([
  // Public Routes
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
      { path: 'blog', element: <Blog showAll={true} /> },
      { path: 'blog/:slug', element: <ArticleDetail /> },
      { path: 'frequentlyaskedquestions', element: <FAQ /> },
      { path: 'termsandconditions', element: <TAC /> },
      { path: 'privacypolicy', element: <PrivacyPolicy /> },

      // Catch-all for non-existent public routes
      { path: '*', element: <NotFound /> },
    ],
  },

  // User Routes
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
          { path: 'exams/job', element: <Job /> },
          { path: 'exams/jamb', element: <Jamb /> },
          { path: 'exams/waec', element: <Waec /> },
          { path: 'exams/neco', element: <Neco /> },
          { path: 'exams/nabteb', element: <Nabteb /> },
          { path: 'certification/certificates', element: <Certificate /> },
          { path: 'certification/reportcard', element: <ReportCard /> },
          { path: 'help/faq', element: <FAQS /> },
          { path: 'help/tutorials', element: <Tutorials /> },
          { path: 'help/reportissue', element: <ReportIssue /> },
          { path: 'help/contactsupport', element: <ContactSupport /> },
          { path: 'settings/accountsettings', element: <AccountSettings /> },
          { path: 'settings/preference', element: <Preference /> },
          {
            path: 'settings/notificationssettings',
            element: <NotificationsSettings />,
          },
          { path: 'settings/reportissue', element: <ReportIssue /> },

          { path: 'reportcard', element: <Nothing /> },
          { path: 'stats', element: <Nothing /> },
          { path: 'message', element: <UserInbox /> },
          { path: 'studyebook', element: <Nothing /> },
          { path: 'studyvideos', element: <Nothing /> },
          { path: 'communitychat', element: <Nothing /> },

          { path: '*', element: <NotFound /> },
        ],
      },
      { path: 'exam/:quizId', element: <Exam /> },

      // Catch-all for non-existent user routes
      { path: '*', element: <NotFound /> },
    ],
  },

  // Admin Routes
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
      { path: 'visitortab', element: <VisitorTab /> },
      { path: 'user-activities', element: <UserActivityTab /> },
      { path: 'messagecenter', element: <MessageCenter /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'blog/create', element: <AdminArticleForm /> },
      { path: 'blog/edit/:id', element: <AdminArticleForm /> },
      { path: 'contact-messages', element: <ContactMessage /> },

      // Catch-all for non-existent admin routes
      { path: '*', element: <NotFound /> },
    ],
  },

  // Global Catch-All Route (Just in Case)
  { path: '*', element: <NotFound /> },
])

export default routes
