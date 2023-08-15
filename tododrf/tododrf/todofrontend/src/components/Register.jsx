import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Login from './login';

function Register() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const idFromLocalStorage = localStorage.getItem('id');
    setUserId(idFromLocalStorage);
  }, []);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async(event) => {
    if(!username || !password || username.length < 3 || password.length < 3){
      return;
    }
    event.preventDefault();


    // Here you can perform actions like sending data to the server or other processing
    console.log('Submitted:', { username, password });


      try {
      const response = await axios.post('http://localhost:8000/register', {
        
       name:username,password:password
    }); 
        if (response.status === 201) {
          navigate("/login");
       
      }
    } catch (error) {
      alert('Select a unique username', error);
    }
    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  if(userId===null||userId===''){
    return <Login />
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
