// App.tsx
import { Routes, Route, useLocation, Navigate} from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Card2 from './components/Card2'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Signup from './components/SignUp'
import Login from './components/Login'
import { useAuth } from './hooks/useAuth'

const App = () => {
  const location = useLocation()
  const authPaths = ['/login', '/signup']
  const isAuthPage = authPaths.includes(location.pathname)

  const { isAuthenticated, loading } = useAuth()

  if (loading) return null // or a loading spinner

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Signup />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/"
          element={
            <>
              <div id="home">
                <Card />
              </div>
              <Card2 />
              <div id="services">
                <Services />
              </div>
              <div id="about">
                <About />
              </div>
              <div id="contact">
                <Contact />
              </div>
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}

export default App
