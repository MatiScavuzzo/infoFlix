import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { ApiContextProvider } from './contexts/ApiContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiContextProvider>
      <RouterProvider router={router} />
    </ApiContextProvider>
  </React.StrictMode>
)
