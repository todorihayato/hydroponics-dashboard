import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { registerSW } from 'virtual:pwa-register'
import './assets/css/sanitize.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

registerSW()
