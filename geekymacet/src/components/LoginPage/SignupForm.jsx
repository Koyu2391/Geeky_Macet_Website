import React from 'react'
import { useState, useEffect } from 'react';
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

export default function SignupForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roll, setRoll] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [password, setPassword] = useState('');
  const [rollPre, setRollPre] = useState('');
  const [rollPost, setRollPost] = useState('');

  // roll update when we change rollpre and rollpost
  useEffect(() => {
    setRoll(rollPre + rollPost);
  },[rollPre, rollPost]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = { name, email, phone, roll, year, branch, password };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setRoll('');
        setYear('');
        setBranch('');
        setPassword('');
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

    return (
        <form 
        onSubmit={(e)=>{
          submitHandler(e);
        }} 
        action='/register'
        method='post'
        className='mt-[20px]  md:flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%]'>
      
                  {/* signup page heading */}
                  <div className='w-[100%] '>
                    <p className='font-bold text-xl'>Get Started</p>
                    <p className='mb-6 text-gray-500'>Welcome to Geeky Macet - Let's Create your account</p>
                    <hr />
                  </div>
      
                  {/* signup data */}
                  <div className='w-[100%] mt-6'>

                    {/* name input box */}
                    <div className='flex flex-col w-[100%] '>
                      <label htmlFor="name"  className='text-s font-normal'> Full Name</label>
                      <input
                      value={name} 
                      onChange={(e)=>{
                        setName(e.target.value);
                      }} 
                      required 
                      type="text"
                      id='name'  
                      name='name'
                      placeholder='Full Name' 
                      className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                    </div>
      
        
                    {/* email input box */}
                    <div className='flex flex-col w-[100%] mt-4'>
                      <label htmlFor="signUpEmail"  className='text-s font-normal'> Email </label>
                      <input
                      value={email} 
                      onChange={(e)=>{
                        setEmail(e.target.value);
                      }} 
                      required 
                      type="email" 
                      id='signUpEmail'  
                      name='email'
                      placeholder='Email' className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                    </div>

                     {/* phone input box */}
                    <div className='flex flex-col w-[100%] mt-4'>
                      <label htmlFor="phone"  className='text-s font-normal'> Phone Number</label>
                      <input
                      value={phone} 
                      onChange={(e)=>{
                        setPhone(e.target.value);
                      }} 
                      required 
                      type="number"
                      id='phone'  
                      name='phone'
                      placeholder='Phone Number' 
                      className='h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                    </div>

                      <div className='w-full flex gap-[4%]'>

                       {/* rollNo input box */}
                    <div className='flex flex-col w-[48%] mt-4'>
                      <label htmlFor="rollPre"  className='text-s font-normal'> Roll Number</label>
                      <div className='flex gap-2 items-center'>
                        {/* roll pre */}
                      <input
                      value={rollPre} 
                      onChange={(e)=>{
                        setRollPre(e.target.value);
                      }} 
                      required 
                      type="number"
                      id='rollPre'  
                      name='rollPre'
                      placeholder='014' 
                      className='w-[40%] h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                      <p>/</p>
                      {/* roll post */}
                      <input
                      value={rollPost} 
                      onChange={(e)=>{
                        setRollPost(e.target.value);
                      }} 
                      required 
                      type="number"
                      id='rollPost'  
                      name='rollPost'
                      placeholder='22' 
                      className='w-[40%] h-[42px] border-[1px] border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'/>
                      </div>
                    </div>

                      {/* year input box */}
                      <div className='flex flex-col w-1/2 mt-4'>
                      <label htmlFor="year"  className='text-s font-normal'> Year </label>
                      <select 
                      name="year" 
                      id="year"
                      value={year}
                      onChange={(e)=>{
                        setYear(e.target.value);
                      }}
                      className='h-[42px] bg-white border-[1px] bg-transparent border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                        <option value="">Select Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>

                    </div>

                      {/* Branch input box */}
                      <div className='flex flex-col w-[100%] mt-4'>
                      <label htmlFor="branch"  className='text-s font-normal'> Branch </label>
                      <select 
                      name="branch" 
                      id="branch"
                      value={branch}
                      onChange={(e)=>{
                        setBranch(e.target.value);
                      }}
                      className='h-[42px] bg-white border-[1px] bg-transparent border-gray-300 p-2 rounded-xl focus:outline-none focus:border-green-900'>
                        <option value="">Select Branch</option>
                        <option value="B.TECH IN CSE ( CORE )">B.TECH IN CSE ( CORE )</option>
                        <option value="B.TECH IN CSE ( AI & ML )">B.TECH IN CSE ( AI & ML )</option>
                        <option value="B.TECH IN CSE ( DS )">B.TECH IN CSE ( DS )</option>
                        <option value="B.TECH IN CIVIL">BTECH IN CIVIL</option>
                        <option value="B.TECH IN EEE">B.TECH IN EEE</option>
                        <option value="DIPLOMA IN CSE">DIPLOMA IN CSE</option>
                        <option value="DIPLOMA IN CIVIL">DIPLOMA IN CIVIL</option>
                        <option value="DIPLOMA IN EEE">DIPLOMA IN EEE</option>
                      </select>
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
      
      
                    {/* signup button */}
                    <button type='submit' className='mt-8 bg-green-950 text-white p-2 w-[100%] rounded-xl font-normal' onClick={submitHandler}>Sign Up</button>
                    <p className='text-center mt-3'>Already have an account? 
                      <span
                      onClick={()=>{
                        props.loginStatus();
                      }}
                      className='text-green-900 cursor-pointer' > Log In</span>
                    </p>
                  </div>
                </form>
      )
    }
