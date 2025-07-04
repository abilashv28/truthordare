import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import i18n configuration before the App
import './i18n/i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
