import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../../shared/event-probe.js'
import EventsPage from './EventsPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EventsPage />
  </StrictMode>,
)
