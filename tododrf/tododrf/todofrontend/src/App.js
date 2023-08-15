import React ,{useState,useEffect}from 'react';
import Home from './components/Home';
import Login from './components/login';
import Register from './components/Register';

import TodoApp from './components/TodoApp'; // Import your TodoApp component

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function App() {
  const [userId, setUserId] = useState(localStorage.getItem('id'));
    useEffect(() => {
    const idFromLocalStorage = localStorage.getItem('id');
    setUserId(idFromLocalStorage);
  }, []);

if(userId){ 
  return(
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl">TodoApp</h1> {/* Title */}
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">
                  ADD-task
                </Link>
              </li>
              <li>
               
              </li>
              <li>
                <Link to="/todo" className="text-white hover:text-gray-300">
                  View-tasks
                </Link> {/* Link to your TodoApp */}
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
             
            <Route path="/todo" element={<TodoApp />} /> {/* Route to your TodoApp */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl">TodoApp</h1> {/* Title */}
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">
                  ADD-task
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/todo" className="text-white hover:text-gray-300">
                  View-tasks
                </Link> {/* Link to your TodoApp */}
              </li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
             
            <Route path="/todo" element={<TodoApp />} /> {/* Route to your TodoApp */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

