import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './i18n'
import './styles/styles.css'
import './styles/header.css'
import './styles/footer.css'
import './styles/services.css'
import './styles/projects.css'
import './styles/responsive.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
