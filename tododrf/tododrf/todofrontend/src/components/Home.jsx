import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Login from './login';

const Home = ({ onAddTodo }) => {
  const [userId, setUserId] = useState(localStorage.getItem('id'));

    useEffect(() => {
    const idFromLocalStorage = localStorage.getItem('id');
    setUserId(idFromLocalStorage);
  }, []);

  const [newTask, setNewTask] = useState('');

  

  const handleAddTodo = async () => {
    console.log(newTask)
    if (newTask.trim() === '') {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/todos', {
        
        "task": newTask,
        "completed": false,
        "createdBy": userId
    }); 
        if (response.status === 201) {
        onAddTodo(newTask);
        
        
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }

    setNewTask('');
  };

  if(userId===null||userId===''){
    return <Login />
  }

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Home</h2>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 mb-2 border rounded-md"
          placeholder="Enter task title..."
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 mr-2"
          onClick={handleAddTodo}
        >
          Add
        </button>
        <Link
          to="/todo"
          className="px-4 py-2 text-blue-500 border rounded-md hover:bg-blue-100"
        >
          View Todos
        </Link>
      </div>
    </div>
  );
};

export default Home;
