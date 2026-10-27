import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminApp from './AdminApp.jsx'

const isAdminPage = window.location.pathname.replace(/\/$/, '') === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminPage ? <AdminApp /> : <App />}
  </StrictMode>,
)
