import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FiCheckCircle, FiTrash2 } from 'react-icons/fi'; // Import icons from react-icons


const TodoApp = () => {
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const [todos, setTodos] = useState([]);
 

  useEffect(() => {
    const idFromLocalStorage = localStorage.getItem('id');
    setUserId(idFromLocalStorage);
    // Fetch todos from API
    const response = axios.post('http://localhost:8000/hello', {
      name: userId
    })
      .then(response => {
        console.log(response.data)
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleMarked = async (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    try {
      const todo = updatedTodos.find(todo => todo.id === id);
      const updatedTodo = { ...todo };

      await axios.put(`http://localhost:8000/todos`, updatedTodo);
    } catch (error) {
      console.error('Error marking todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the todo
      await axios.post(`http://localhost:8000/delete`, {id});
      // Update the state after deletion
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Todo List</h2>
        <div className="flex justify-between items-center mb-2">
         
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={`mb-2 flex justify-between items-center p-2 rounded-md ${
                todo.completed ? 'line-through text-gray-400' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span>{todo.task}</span>
              <div>
                <button
                  className={`px-2 py-1 rounded-md ${
                    todo.completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                  onClick={() => handleMarked(todo.id)}
                >
                  <FiCheckCircle size={18} />
                </button>
                <button
                  className={`px-2 py-1 ml-2 rounded-md ${
                    todo.completed ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
                  }`}
                  onClick={() => handleDelete(todo.id)}
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
