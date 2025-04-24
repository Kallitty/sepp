import axios from 'axios'
import Cookies from 'js-cookie'
import { UAParser } from 'ua-parser-js'

const logActivity = async (pageVisited) => {
  try {
    const parser = new UAParser()
    const result = parser.getResult()

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const language = navigator.language || navigator.userLanguage

    const payload = {
      page_visited: pageVisited,
      referrer: document.referrer,
      browser: result.browser.name,
      device: result.device.type || 'desktop',
      os: result.os.name,
      timezone: timezone,
      language: language,
      // For city/country, you might want to use a geolocation API
      // or get it from the user's IP on the backend
    }

    await axios.post('/log-activity', payload)
  } catch (error) {
    console.error('Error logging activity:', error)
  }
}

export default logActivity
