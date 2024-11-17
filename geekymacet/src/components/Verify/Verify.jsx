import React, { useState } from 'react';
import axios from 'axios';

function Verify() {
  const [rollNumber, setRollNumber] = useState('');
  const [year, setYear] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleVerify = async () => {
    if (!rollNumber || !year) {
      alert('Roll number and year are required');
      return;
    }
    const rollString = rollNumber.toString();  
    const yearString = year.toString();        
    console.log('Sending Data:', { user_roll: rollString, user_year: yearString });

  
    console.log('rollString:', rollString);  
    console.log('yearString:', yearString);  
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/verify', {
        user_roll: rollString,  
        user_year: yearString,  
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      setResponseMessage(response.data.message); 
    } catch (error) {
      setResponseMessage(error.response?.data?.message || 'An error occurred while verifying');
    }
  };
  
  

  return (
    <div className='p-4 flex h-[calc(100vh-68px)] flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Verify</h1>

      {/* Input for Roll Number */}
      <input
        type='text'
        placeholder='Enter Roll Number'
        className='mb-4 p-2 border border-gray-300 rounded w-64'
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />

      {/* Dropdown for Year */}
      <select
        className='mb-4 p-2 border border-gray-300 rounded w-64'
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value='' disabled>Select Year</option>
        <option value='2021'>2021</option>
        <option value='2022'>2022</option>
        <option value='2023'>2023</option>
        <option value='2024'>2024</option>
      </select>

      {/* Verify Button */}
      <button
        className='bg-blue-500 text-white p-2 rounded w-64'
        onClick={handleVerify}
      >
        Verify
      </button>

      {/* Display Response Message */}
      {responseMessage && (
        <p className='mt-4 text-center text-gray-700'>{responseMessage}</p>
      )}
    </div>
  );
}

export default Verify;
