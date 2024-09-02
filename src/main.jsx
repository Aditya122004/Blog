import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebasecontextProvider } from './context/Firebase.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <FirebasecontextProvider>
      <App />
      </FirebasecontextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
