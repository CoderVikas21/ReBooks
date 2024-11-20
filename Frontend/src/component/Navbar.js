import React, { useState } from 'react'
import CTAButton from './CTAButton'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from './context'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = ({loggedIn,setLoggin}) => {
  const navigate = useNavigate();
  const {user,setUser} = useUser();

  function SignUpBtn(){
    navigate('/signup');
  }


  async function LogOutBtn(){
    try{
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/logout`,
        {},
        {withCredentials:true}
      )
      setUser("Guest")
      toast.success(response.data.message);
      setLoggin(false);
      navigate('/')
    }
    catch(e){
      console.error("Logout failed:", e);
    }
  }

  function MyAccountBtn(){
    
  }
  
  return (
    <>
      <div className="navbar absolute top-8 w-full pr-36  flex gap-10 z-10">

        <div className='w-1/2 flex justify-start ml-36 items-center'>
              <span className='border-2 border-white bg-red-800 rounded-full w-16 h-16 flex items-center justify-center text-white'>{user}</span>
        </div>

        <div className='w-1/2 flex justify-end gap-10'>
        {
            !loggedIn && <>
                <CTAButton onClick = {SignUpBtn} content={"Register/LogIn"}/>
            </>
        }

        {
            loggedIn && <>
                <CTAButton onClick ={LogOutBtn}
                    content={"Logout"}/>
                <CTAButton onClick = {MyAccountBtn} content={"My Account"}/>
            </>
        }
        </div>
        
      </div>
    </>
  )
}

export default Navbar
