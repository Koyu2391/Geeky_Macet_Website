import React, { useState } from 'react';
import axios from 'axios';
import VerifyForm from './VerifyForm';

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
    <VerifyForm/>
  );
}

export default Verify;
