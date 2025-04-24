const inactivityTime = 15 * 60 * 1000 //

let inactivityTimer
let lastActivityTime = Date.now()

// Activity detection functions
const activityEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
  'click',
  'input',
  'wheel',
]

const resetInactivityTimer = (logoutCallback) => {
  lastActivityTime = Date.now()

  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }

  inactivityTimer = setTimeout(() => {
    // Double-check if there really was no activity
    const currentTime = Date.now()
    if (currentTime - lastActivityTime >= inactivityTime) {
      logoutCallback()
    }
  }, inactivityTime)
}

const startInactivityTimer = (logoutCallback) => {
  // Set initial timer
  resetInactivityTimer(logoutCallback)

  // Add event listeners for all activity types
  activityEvents.forEach((event) => {
    window.addEventListener(
      event,
      () => resetInactivityTimer(logoutCallback),
      true
    )
  })

  // Special case for visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Check if user was away too long
      const currentTime = Date.now()
      if (currentTime - lastActivityTime >= inactivityTime) {
        logoutCallback()
      } else {
        resetInactivityTimer(logoutCallback)
      }
    }
  })
}

const clearInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
    inactivityTimer = null
  }

  // Remove all event listeners
  activityEvents.forEach((event) => {
    window.removeEventListener(event, resetInactivityTimer, true)
  })
}

export { startInactivityTimer, clearInactivityTimer, resetInactivityTimer }
