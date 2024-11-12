import React, { useState } from 'react';

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleAdminSubmit = (event) => {
    event.preventDefault();
    if (adminName && adminPassword) {
      console.log('Admin Name:', adminName);
      console.log('Admin Password:', adminPassword);
      // Add admin logic here (e.g., API call)
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleAdminSubmit}>
        <div className="mb-4">
          <label htmlFor="adminName" className="block mb-2 text-sm font-medium">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="adminPassword" className="block mb-2 text-sm font-medium">Admin Password:</label>
          <input
            type="password"
            id="adminPassword"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
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

export default AdminLogin;