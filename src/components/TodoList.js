// src/components/TodoList.js
import React, { useState } from 'react';
import './TodoList.css'; // Import your CSS file

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Prevent adding empty tasks

    const updatedTodos = [...todos, { task: newTask, isCompleted: false }];
    setTodos(updatedTodos);
    setNewTask(''); // Clear the input field
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setEditTask(todos[index].task);
  };

  const handleSaveEdit = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, task: editTask } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditTask('');
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
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
          <li key={index} className={`todo-list__item ${todo.isCompleted ? 'todo-list__item--completed' : ''}`}>
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
                {todo.task}
                <button onClick={() => toggleComplete(index)} className="todo-list__toggle-button">
                  {todo.isCompleted ? 'Undo' : 'Complete'}
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
