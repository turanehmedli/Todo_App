import { Route, Routes, useNavigate } from "react-router"
import HomePage from './pages/HomePage'
import Register from "./pages/Register"
import Login from "./pages/Login"
import ForgotYourPassword from "./pages/ForgotYourPassword"
import NavBar from "./components/home/NavBar"
import { useAuthStore } from "./stores/authStore"
import { useEffect } from "react"
import NotFound from "./pages/NotFound"
import CreateTodo from "./pages/CreateTodo"
import { useThemeStore } from "./stores/themeStore"
import EditTodo from "./pages/EditTodo"
import { ToastContainer } from 'react-toastify';

const App = () => {
  const navigate = useNavigate()
  const {accessToken}=useAuthStore()
  const {isDarkmodeOn}=useThemeStore()

  useEffect(()=>{
    if(!accessToken){
      navigate('/login')
    }
  },[])
  return (
    <div className={`w-full flex flex-col min-h-screen h-fit justify-center items-center overflow-hidden ${isDarkmodeOn ? "bg-slate-900 text-white" : "bg-white text-black"}`}>
      <NavBar/>
      <Routes>
        <Route path="*" element={<NotFound/>} />
        {accessToken&& <>
          <Route path="/" element={<HomePage/>} />
          <Route path="/forgotYourPassword" element={<ForgotYourPassword/>} />
          <Route path={"/createTodo"} element={<CreateTodo/>} />
          <Route path={"/editTodo/:id"} element={<EditTodo/>} />
        </>}
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      
      <ToastContainer />
    </div>
  )
}

export default App