import { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import {getUserData} from "../utils"
import {useNavigate} from "react-router-dom"

const AuthLayout = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        if(getUserData()) {
          navigate("/chat")
        }
    },[])

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
