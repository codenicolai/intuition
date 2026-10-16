import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PortFormPage from './PortFormPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortFormPage />
  </StrictMode>,
)
