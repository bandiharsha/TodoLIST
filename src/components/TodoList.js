import React, { useState, useEffect } from 'react';
import './TodoList.css'; // Updated CSS for styling
import axios from 'axios'; 

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
        const response = await axios.post('http://localhost:5000/gettodos', { token });
        setTodos(response.data.todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/addtodo', { token, data: newTask });

      setNewTask('');
      const response = await axios.post('http://localhost:5000/gettodos', { token });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditTask(todos[index].data);
  };

  const handleSaveEdit = async (index) => {
    const token = localStorage.getItem('token');
    const updatedTodo = { ...todos[index], data: editTask, token };

    try {
      await axios.post('http://localhost:5000/edittododata', updatedTodo);
      const updatedTodos = todos.map((todo, i) => (i === index ? updatedTodo : todo));
      setTodos(updatedTodos);
      setEditingIndex(null);
      setEditTask('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (index) => {
    const token = localStorage.getItem('token');
    const updatedTodo = { ...todos[index], completed: !todos[index].completed, token };

    try {
      await axios.post('http://localhost:5000/edittodocompleted', updatedTodo);
      const updatedTodos = todos.map((todo, i) => (i === index ? updatedTodo : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/deletetodo', { ...todos[index], token });
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">React To-Do List</h2>
      <div className="todo-controls">
        <input
          type="text"
          placeholder="Add a new to-do"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="todo-input"
        />
        <button onClick={handleAddTask} className="todo-add-button">Add Task</button>
      </div>
      <div className="todo-filters">
        <button className="filter-button">All</button>
        <button className="filter-button">To-do</button>
        <button className="filter-button">Completed</button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Description</th>
            <th>Category</th>
            <th>When</th>
            <th>Priority</th>
            <th>Fulfillment</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo._id} className={todo.completed ? 'completed' : ''}>
              <td>{editingIndex === index ? (
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="edit-input"
                />
              ) : (
                todo.data
              )}</td>
              <td>{/* Additional data such as description can go here */}</td>
              <td>{/* Category */}</td>
              <td>{/* When */}</td>
              <td>{/* Priority */}</td>
              <td>{/* Fulfillment percentage */}</td>
              <td>
                {editingIndex === index ? (
                  <button onClick={() => handleSaveEdit(index)} className="save-button">Save</button>
                ) : (
                  <>
                    <button onClick={() => toggleComplete(index)} className="toggle-button">
                      {todo.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button onClick={() => handleEditTask(index)} className="edit-button">Edit</button>
                    <button onClick={() => handleDeleteTask(index)} className="delete-button">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
