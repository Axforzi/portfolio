import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import './styles/styles.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/services.css'
import './styles/projects.css'
import './styles/responsive.css'
import App from './App.jsx'

// Key shared with public/404.html. See resolveInitialPath() below.
const COLD_LINK_KEY = 'gh-pages:cold-link-path'

// import.meta.env.BASE_URL is '/portfolio/' because of vite.config.js's `base`.
// React Router wants a basename with no trailing slash, and both must agree or
// every route resolves one segment off.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, '')

function resolveInitialPath() {
  // 1. Links shared while the site used HashRouter still point at /portfolio/#/projects.
  //    The browser is already sitting on the app root here, so rewrite the URL in place
  //    and let the router pick it up -- no server round trip, so no 404 fallback needed.
  if (window.location.hash.startsWith('#/')) {
    const legacyRoute = window.location.hash.slice(1)
    window.history.replaceState(null, '', `${basename}${legacyRoute}`)
    return
  }

  // 2. A cold load of a deep path (/portfolio/projects) gets public/404.html, which
  //    stashes the requested path and bounces to the app root. Put it back before
  //    the router reads location, then clear it so a later reload starts clean.
  const coldPath = window.sessionStorage.getItem(COLD_LINK_KEY)
  if (coldPath) {
    window.sessionStorage.removeItem(COLD_LINK_KEY)
    window.history.replaceState(null, '', coldPath)
  }
}

resolveInitialPath()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
