import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async(event) => {
    event.preventDefault();
    // Here you can perform actions like sending login data to the server
    console.log('Logging in:', { username, password });


      try {
      const response = await axios.post('http://localhost:8000/login', {
        
       name:username,password:password
    }); 
        
          console.log(response.data[0].id)
          localStorage.setItem('id',response.data[0].name)
           navigate("/");
       
      
    } catch (error) {
      alert('Select a unique username', error);
    }
    // Reset the form after login attempt
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
