import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { configureAnalytics } from './services/analytics/analytics'

if (import.meta.env.DEV) {
  configureAnalytics((event, payload) => {
    console.info("[analytics]", event, payload)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
