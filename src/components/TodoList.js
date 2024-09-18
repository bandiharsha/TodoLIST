import React, { useState, useEffect } from 'react';
import './TodoList.css'; // Import your CSS file
import axios from 'axios'; // Import Axios

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  // Fetch todos from the backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
    
        const response = await axios.post('http://localhost:5000/gettodos', {
          token: token,
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    

    fetchTodos();
  }, []); // Re-run the effect if the token changes

  const handleAddTask = async () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/addtodo', { token: token, data: newTask });

      setNewTask(''); // Clear the input field
      // Optionally, re-fetch todos or update the state here
    
        const response = await axios.post('http://localhost:5000/gettodos', {
          token: token,
        });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditTask(todos[index].data); // Set the current task for editing
  };

  const handleSaveEdit = async (index) => {
    const token = localStorage.getItem('token');
    const updatedTodo = { ...todos[index], data: editTask, token: token};

    try {
      const token = localStorage.getItem('token');

      await axios.post(`http://localhost:5000/edittododata`, { ...todos[index], data: editTask, token: token}, {
      });

      const updatedTodos = todos.map((todo, i) =>
        i === index ? updatedTodo : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditTask('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (index) => {
    const token = localStorage.getItem('token');
    const updatedTodo = { ...todos[index], completed: !todos[index].completed, token: token};

    try {
      const token = localStorage.getItem('token');

      await axios.post(`http://localhost:5000/edittodocompleted`, { ...todos[index], completed: !todos[index].completed, token: token}, {
      });

      const updatedTodos = todos.map((todo, i) =>
        i === index ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(`http://localhost:5000/deletetodo`, {...todos[index], token: token}, {
      });

      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <h2 className="todo-list__title">Your To-Do List</h2>
      <div className="todo-list__input-container">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="todo-list__input"
        />
        <button onClick={handleAddTask} className="todo-list__button">Add Task</button>
      </div>
      <ul className="todo-list__items">
        {todos.map((todo, index) => (
          <li key={todo._id} className={`todo-list__item ${todo.completed ? 'todo-list__item--completed' : ''}`}>
            {editingIndex === index ? (
              <div className="todo-list__edit-container">
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="todo-list__edit-input"
                />
                <button onClick={() => handleSaveEdit(index)} className="todo-list__save-button">
                  Save
                </button>
              </div>
            ) : (
              <>
                {todo.data}
                <button onClick={() => toggleComplete(index)} className="todo-list__toggle-button">
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => handleEditTask(index)} className="todo-list__edit-button">
                  Edit
                </button>
                <button onClick={() => handleDeleteTask(index)} className="todo-list__delete-button">
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
