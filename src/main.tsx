import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { registerSW } from 'virtual:pwa-register'
import './assets/css/sanitize.css'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)

registerSW()
