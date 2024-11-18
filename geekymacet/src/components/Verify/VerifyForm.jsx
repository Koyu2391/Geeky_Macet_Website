import React from 'react';
import { useState, useEffect } from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from 'axios';

function VerifyForm() {

const [roll, setRoll] = useState('');
const [rollPre, setRollPre] = useState('');
const [rollPost, setRollPost] = useState('');
const [showHint, setShowHint] = useState(false);

// roll update when we change rollpre and rollpost
useEffect(() => {
    setRoll(rollPre + rollPost);
},[rollPre, rollPost]);

const handleVerify = async () => {
    const rollString = roll.toString();       
    console.log('rollString:', rollString);  
    try {
    const response = await axios.post('http://127.0.0.1:5000/verify', {
        user_roll: rollString,  
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
        
    });
    console.log(response.data.message); 
    } catch (error) {
        alert('An error occurred: ' + error.message);
    }
};

return (
    <div className='py-[10px] mt-[68px] flex h-[calc(100vh-68px-68px)] items-center justify-center'>
        <div className='bg-[#eaeaf0] px- py-14 flex flex-col items-center justify-center min-w-[300px] max-w-[95%] rounded-lg relative'>
            <div>
                <p className='text-blue-950 font-bold text-xl text-nowrap min-w-[300px] max-w-[60%] text-start'>Verify Geeky Macet Members</p>
                <p className=' pt-1 flex items-center text-orange-400 font-normal text-l min-w-[300px] max-w-[60%] text-start' 
                    onMouseEnter={() => setShowHint(true)}
                    onMouseLeave={() => setShowHint(false)}
                    >What is this?  <IoIosInformationCircleOutline /></p>
                <div className={`absolute right-0 bg-[#FBFBFB] shadow-lg rounded-md py-2 transform transition-all duration-300 ease-in-out ${
                    showHint ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}>
                    <img className='w-[300px] h-[300px]' src="https://plus.unsplash.com/premium_photo-1731326956762-a37455b6bb0e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
            </div>
            <form action="/verify" method='post'
            onSubmit={handleVerify}
            className='mt-8 flex flex-col items-center justify-center grow h-[100%] min-w-[300px] max-w-[60%]'>
                <p className='text-black font-bold text-s text-start w-full'>ENTER ROLL NO. TO VERIFY MEMBER</p>
                    
                    {/* rollNo input box */}
                    <div className='mt-4 flex w-full justify-between items-center'>
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
                    className='w-[40%] h-[42px] border-[1px] border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-900'/>
                    <p className='text-3xl'>/</p>
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
                    className='w-[40%] h-[42px] border-[1px] border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-900'/>
                    </div>
                    <button type='submit' className='mt-4 bg-green-950 h-[50px] text-white p-2 w-[100%] rounded-xl font-normal'>Verify</button>
            </form>
        </div>
    </div>
)
}

export default VerifyForm;