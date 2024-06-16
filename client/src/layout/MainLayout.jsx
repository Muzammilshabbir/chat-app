
import { Outlet } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import {getUserData} from "../utils"

export default function MainLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="main">
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
              Chat App
          </div>
          {getUserData()? (
            <>
            <p className="text-white text-2xl font-bold">Welcome {getUserData().username}</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
                Logout
            </button>
            </>
          ):null}
      </nav>
      {<Outlet/>}
    </div>
  )
}
