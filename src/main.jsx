import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { ApiContextProvider } from './contexts/ApiContext'
import { ThemeContextProvider } from './contexts/ThemeContext'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCJSNntd6A-O8pucwdDYmojDsM2Hhxvf9o",

  authDomain: "infoflix-11651.firebaseapp.com",

  projectId: "infoflix-11651",

  storageBucket: "infoflix-11651.appspot.com",

  messagingSenderId: "920812134387",

  appId: "1:920812134387:web:ac2c7b83f5308f16ac3c86"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ApiContextProvider>
        <RouterProvider router={router} />
      </ApiContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
)
