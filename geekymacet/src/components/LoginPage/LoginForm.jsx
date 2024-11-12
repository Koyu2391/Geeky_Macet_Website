import React, { useState } from 'react';

const LoginForm = () => {
  // State to manage form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    if (email && password) {
      console.log('Email:', email);
      console.log('Password:', password);
      // Add login logic here (e.g., API call)
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email:</label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Password:</label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-md hover:bg-indigo-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;