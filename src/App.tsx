// App.tsx
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
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
import { getRedirectResult } from 'firebase/auth'
import { auth } from './lib/firebase'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const authPaths = ['/login', '/signup']
  const isAuthPage = authPaths.includes(location.pathname)

  useEffect(() => {
    // Handle Google redirect sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          localStorage.setItem('user', JSON.stringify(result.user))
          navigate('/')
        }
      })
      .catch((error) => {
        console.error("Redirect login error:", error)
      })
  }, [])

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
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
      </Routes>
    </>
  )
}

export default App
