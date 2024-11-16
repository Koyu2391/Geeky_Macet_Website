import React from 'react'
import { useState } from 'react';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      const data = await response.json();  
      console.log('API Response:', data);  
  
      if (data.success) {
        navigate('/developer')
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error('Error:', error);  
      alert('Something went wrong! Check the console.');
    }
  };

  
  
  return (
    <form 
    onSubmit={(e)=>{
      loginSubmitHandler(e);
    }} 
    action='/login'
    method='post'
      className=' flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%] '>
  
              {/* login page heading */}
              <div className='w-[100%] '>
                <p className='font-bold text-xl'>Get Started Now</p>
                <p className='mb-6 text-gray-500'>Welcome to Geeky Macet - Let's login your account</p>
                <hr />
              </div>
  
              {/* login data */}
              <div className='w-[100%] mt-6'>
  
                {/* email input box */}
                <div className='flex flex-col w-[100%] '>
                  <label htmlFor="loginEmail"  className='text-s font-normal'> Email </label>
                  <input 
                  value={email} 
                  onChange={(e)=>{setEmail(e.target.value)}} 
                  required 
                  type="email" 
                  id='email'  
                  name='email'
                  placeholder='Email' 
                  className='border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                </div>
  
                {/* password input box */}
                <div className='flex flex-col mt-4'>
                      <label htmlFor="signUpPassword" className='text-s font-normal'> Password </label>
                    <div className='w-full relative flex items-center'>
                      <input
                      value={password} 
                      onChange={(e)=>{setPassword(e.target.value);}} 
                      required 
                      type = {showPassword ? 'text' : 'password'}
                      id='password'  
                      name='password'
                      placeholder='Password' 
                      className='h-[42px] w-full border-[1px] border-gray-300 p-2 rounded-xl
                      focus:outline-none focus:border-green-900'/>
                      <div className='absolute right-3 '>
                        {showPassword ? <BiHide className='text-2xl' onClick={()=>{setShowPassword(!showPassword)}}/> : <BiShow className='text-2xl' onClick={()=>{setShowPassword(!showPassword)}}/>}
                      </div>
                    </div>
                    </div>
  
                {/* Login button */}
                <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal' onClick={loginSubmitHandler}>Log in</button>
                <p className='text-center mt-3'>Don't have an account?  
                  <span
                  onClick={()=>{
                    props.loginStatus();
                  }}
                   className='text-green-900 cursor-pointer'> Sign Up</span></p>
  
              </div>
            </form>
  )
  }