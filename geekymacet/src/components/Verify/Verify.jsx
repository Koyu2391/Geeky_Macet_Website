import React from 'react';
import { useState, useEffect } from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from 'axios';
import hint from '../../assets/hint.001.jpeg'

function Verify() {

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
                    >What is this?&nbsp;<IoIosInformationCircleOutline 
                    onMouseEnter={() => setShowHint(true)}
                    onMouseLeave={() => setShowHint(false)}/></p>
                <div className={`absolute right-0 bg-[#ffffff] shadow-lg rounded-md py-2 transform transition-all duration-300 ease-in-out ${
                    showHint ? 'opacity-100 pointer-events-auto' : 'opacity-0  pointer-events-none'
                    }`}>
                    <img className='min-w-[300px] max-w-[100%] ' src={hint} alt="Hint For Roll" />
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

export default Verify;