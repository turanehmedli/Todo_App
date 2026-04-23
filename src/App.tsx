import { Route, Routes, useNavigate } from "react-router"
import HomePage from './pages/HomePage'
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgotYourPassword from "./pages/ForgotYourPassword"
import NavBar from "./components/home/NavBar"
import { useAuthStore } from "./stores/authStore"
import { useEffect } from "react"
import NotFound from "./pages/NotFound"

const App = () => {
  const navigate = useNavigate()
  const {accessToken}=useAuthStore()

  useEffect(()=>{
    if(!accessToken){
      navigate('/login')
    }
  },[])
  return (
    <div className="w-full flex flex-col min-h-screen h-fit justify-center items-center overflow-hidden">
      <NavBar/>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        {accessToken&& <>
          <Route path="/" element={<HomePage/>} />
          <Route path="/forgotYourPassword" element={<ForgotYourPassword/>} />
        </>}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        
        
      </Routes>
      
    </div>
  )
}

export default App