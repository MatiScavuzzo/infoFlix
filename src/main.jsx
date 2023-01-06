import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { ApiContextProvider } from './contexts/ApiContext'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq1hjVmYy75k1CaOhRSkdsJQdLb9cyKPg",
  authDomain: "infoflix-b4315.firebaseapp.com",
  projectId: "infoflix-b4315",
  storageBucket: "infoflix-b4315.appspot.com",
  messagingSenderId: "172230491539",
  appId: "1:172230491539:web:7a1f64f723eb288f8a3c66",
  measurementId: "G-9R1QTCM335"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiContextProvider>
      <RouterProvider router={router} />
    </ApiContextProvider>
  </React.StrictMode>
)
