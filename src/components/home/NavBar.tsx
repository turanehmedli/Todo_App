import { NavLink } from "react-router"
import { useAuthStore } from "../../stores/authStore"


const NavBar = () => {
    const {clearTokens}=useAuthStore()
  return (
    <div className="w-full px-4 py-3 flex justify-between items-center">
        <h2 className="font-bold text-2xl">App</h2>
        <div className="flex gap-5">
            <button onClick={clearTokens } className="border px-4 py-2 rounded-lg text-lg font-semibold">log Out</button>
            <button  className="border px-4 py-2 rounded-lg text-lg font-semibold"><NavLink to={'/login'}>You</NavLink></button>
        </div>
    </div>
  )
}

export default NavBar