import { ThemeProvider } from "./components/ThemeProvider"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <ThemeProvider>
   <App />
  </ThemeProvider>
  </BrowserRouter>
)
// ✅ Register Firebase Messaging Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registered:', registration)
    })
    .catch((err) => {
      console.error('❌ Service Worker registration failed:', err)
    })
}