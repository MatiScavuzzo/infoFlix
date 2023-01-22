import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { ApiContextProvider } from './contexts/ApiContext'
import { ThemeContextProvider } from './contexts/ThemeContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ApiContextProvider>
        <RouterProvider router={router} />
      </ApiContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
