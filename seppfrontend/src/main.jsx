import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './home/index.css'
import router from './routes/router.jsx'
import axios from 'axios'

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

const trackVisitor = async () => {
  try {
    const visitorData = {
      device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
      browser: navigator.userAgent,
      os: window.navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      referrer: document.referrer,
      page_visited: window.location.pathname,
    }
    await axios.post('/save-visitor', visitorData)
  } catch (error) {
    console.error('Visitor tracking failed:', error)
  }
}

trackVisitor()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { RouterProvider } from 'react-router-dom'
// import './home/index.css'
// import router from './routes/router.jsx'
// import axios from 'axios'

// axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

// // ||'https://api.seppedu.com/api'
// // 'https://api.seppedu.com/api/sanctum/csrf-cookie'
// // axios.defaults.baseURL = import.meta.env.production.REACT_APP_API_BASE_URL
// // import.meta.env.production.REACT_APP_API_BASE_URL
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Accept'] = 'application/json'
// axios.defaults.withCredentials = true
// axios.defaults.withXSRFToken = true
// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('auth_token')
//   config.headers.Authorization = token ? `Bearer ${token}` : ''
//   return config
// })

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// )
