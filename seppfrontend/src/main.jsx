import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './home/index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './routes/router.jsx'
import axios from 'axios'
import activityLogger from './services/activityLogger'
import {
  startInactivityTimer,
  clearInactivityTimer,
  resetInactivityTimer,
} from './services/inactivityService'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

// Enhanced logout handler
const handleLogout = () => {
  // Clear authentication data
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')

  // Clear the inactivity timer
  clearInactivityTimer()

  // Invalidate any pending requests
  axios.interceptors.request.eject(authInterceptor)

  // Redirect to login page
  window.location.href = '/login'
}

// Start inactivity timer if user is authenticated
const authInterceptor = axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''

  // Reset inactivity timer on each API request
  if (token) {
    resetInactivityTimer(handleLogout)
  }

  return config
})

// Initialize timer if already logged in
if (localStorage.getItem('auth_token')) {
  startInactivityTimer(handleLogout)
}

// Track route changes and reset timer
router.subscribe((state) => {
  activityLogger(state.location.pathname)
  if (localStorage.getItem('auth_token')) {
    resetInactivityTimer(handleLogout)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
