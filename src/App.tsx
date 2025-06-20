// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
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
import { Navigate } from 'react-router-dom'
import { requestPermissionAndGetToken, listenToMessages } from './firebase'
const App = () => {
  const location = useLocation()
  const authPaths = ['/login', '/signup']
  const isAuthPage = authPaths.includes(location.pathname)

  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return 

    const initFCM = async () => {
      await requestPermissionAndGetToken(user.id)
      listenToMessages(user.id, isAuthenticated)
    }

    initFCM()
  }, [user?.id, isAuthenticated])


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

      </Routes>
    </>
  )
}

export default App