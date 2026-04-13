import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'historical-timeline-react/styles.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
