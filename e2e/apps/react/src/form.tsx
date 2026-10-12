import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@intuition-ui/core'
import FormPage from './FormPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormPage />
  </StrictMode>,
)
