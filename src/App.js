// import React, { useState } from 'react';
// import Login from './components/Login';
// import TodoList from './components/TodoList';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   if (!token) {
//     return <Login setToken={(token) => { localStorage.setItem('token', token); setToken(token); }} />;
//   }

//   return <TodoList token={token} />;
// };

// export default App;
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';
 import Signup from './components/Signup';


function App() {
  const location = useLocation();

  return (
    <div>
      {/* Render NavBar only if the current route is not '/login' */}
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todolist" element={<TodoList/>} />

      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}