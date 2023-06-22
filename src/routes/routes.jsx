import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Routes>
  )
}

const useAuth = () => {
  const token = localStorage.getItem('nexDigital:userToken')

  if (token) return true
  return false
}

export const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth()
  
  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login" />
}

export default Router
