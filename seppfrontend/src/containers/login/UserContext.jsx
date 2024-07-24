// UserContext.js
import React, { createContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)

  return (
    <UserContext.Provider value={{ isUserSignedIn, setIsUserSignedIn }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
