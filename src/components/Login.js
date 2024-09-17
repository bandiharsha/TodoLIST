// import React, { useState } from 'react';
// import axios from 'axios';

// // Styles
// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
//   background: 'url(https://images7.alphacoders.com/499/thumb-1920-499934.png) no-repeat center center fixed',
//   backgroundSize: 'cover',
// };

// const boxStyle = {
//   backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with transparency
//   padding: '2rem',
//   borderRadius: '10px',
//   boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
//   width: '300px',
//   textAlign: 'center',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '0.8rem',
//   margin: '0.5rem 0',
//   borderRadius: '5px',
//   border: '1px solid #ddd',
// };

// const buttonStyle = {
//   width: '100%',
//   padding: '0.8rem',
//   backgroundColor: '#007bff',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   fontSize: '1rem',
// };

// const errorStyle = {
//   color: 'red',
//   marginBottom: '1rem',
// };

// const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

//   const handleLogin = async () => {
//     try {
//       const { data } = await axios.post('/api/auth/login', { email, password });
//       setToken(data.token);  // Store the token
//     } catch (error) {
//       setError('Invalid username or password');
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const { data } = await axios.post('/api/auth/login', { username, password });
//       setToken(data.token);  // Store the token upon successful signup
//     } catch (error) {
//       setError('Error creating account. Please try again.');
//     }
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={boxStyle}>
//         <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
//         {error && <p style={errorStyle}>{error}</p>}
//         <input 
//           type="text" 
//           placeholder="Username" 
//           value={username} 
//           onChange={e => setUsername(e.target.value)} 
//           style={inputStyle}
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           style={inputStyle}
//         />
//         <button onClick={isLogin ? handleLogin : handleSignup} style={buttonStyle}>
//           {isLogin ? 'Login' : 'Sign Up'}
//         </button>
//         <p>
//           {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
//           <button 
//             onClick={() => setIsLogin(!isLogin)}
//             style={{ border: 'none', background: 'none', color: '#007bff', cursor: 'pointer' }}
//           >
//             {isLogin ? 'Sign Up' : 'Login'}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to hold the error message

    const handleClick = async (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        try {
            const response = await axios.post('http://localhost:4000/login', {
                email: email,
                password: password,
            });
    
            if (response.status === 200) {
                const token = response.data.token; // Assuming the token is in the response data
                localStorage.setItem('token', token); // Store the token in local storage
                navigate('/todolist'); // Navigate to the landing page
            } else {
                setError('Login failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Invalid email or password'); // Set the error message from the server response
            } else {
                console.error('An error occurred during login:', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Sign in to your account</h2>
                <form onSubmit={handleClick} className="login-form">
                    <div className="login-field">
                        <label htmlFor="email" className="login-label">Email address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="login-input"
                        />
                    </div>
                    <div className="login-field">
                        <label htmlFor="password" className="login-label">Password</label>
                        <a href="#" className="login-forgot">Forgot password?</a>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="login-input"
                        />
                    </div>
                    {error && <div className="login-error">{error}</div>}
                    <button type="submit" className="login-button">Sign in</button>
                </form>
                <p className="login-signup">
                    Not a member?{' '}
                    <button onClick={() => navigate("/signup")} className="signup-button">Sign Up</button>
                </p>
            </div>
        </div>
    );
}
