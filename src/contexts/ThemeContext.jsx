import React, { useState } from 'react'

export const ThemeContext = React.createContext()

export const ThemeContextProvider = ( { children } ) => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }
  return (
    <ThemeContext.Provider value={
      {
        darkMode,
        toggleDarkMode
      }
    }>
      {children}
    </ThemeContext.Provider>
  )
}