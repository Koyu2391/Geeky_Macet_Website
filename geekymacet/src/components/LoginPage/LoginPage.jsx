import React  from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
// import AdminForm from './AdminForm'
import { useState } from 'react'

function LoginPage() {

  const [loginStatus, setLoginStatus] = useState(true);

  const toggleLoginStatus = ()=>{
    setLoginStatus(!loginStatus);
  }


    return (
        <div className='p-[10px] mt-[68px] flex min-h-[calc(100vh-68px-68px)] items-center justify-center'>
            <div className='w-full md:w-[50%] h-full lg:w-[60%] flex justify-center items-center '>
                {loginStatus ? 
                <LoginForm loginStatus = {toggleLoginStatus}/> 
                : 
                <SignupForm loginStatus = {toggleLoginStatus}/>}
            
            </div>
            <div className='hidden md:flex bg-[url("https://images.unsplash.com/photo-1581093196277-9f608bb3d4b6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover w-[50%] h-[calc(100vh-68px-20px)] rounded-xl lg:w-[40%]'></div>
      </div>
    )
}

export default LoginPage