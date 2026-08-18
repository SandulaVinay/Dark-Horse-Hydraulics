import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './brand-refresh.css'
import './mobile.css'
import App from './App.tsx'
import { enableMobileAssemblyScroll } from './components/3d/mobileAssemblyController'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// The assembly section is rendered after the React tree mounts, so initialize
// the native touch-scroll fallback on the next frame.
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => {
    window.setTimeout(enableMobileAssemblyScroll, 250)
  })
}
