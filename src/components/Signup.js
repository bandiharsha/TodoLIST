// src/pages/Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(""); // New state for username
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // State to hold the error message

    const handleClick = async (e) => {
        e.preventDefault(); // Prevent the default form submission
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/signup', {
                username: username, // Include username in the request
                email: email,
                password: password,
            });
    
            if (response.status === 201) {
                navigate('/todolist'); // Navigate to the login page on successful signup
            } else {
                setError('Signup failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Invalid input'); // Set the error message from the server response
            } else {
                console.error('An error occurred during signup:', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">
                    Create a new account
                </h2>

                <form onSubmit={handleClick} className="signup-form">
                    <div className="signup-field">
                        <label htmlFor="username" className="signup-label">
                            Username
                        </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-field">
                        <label htmlFor="email" className="signup-label">
                            Email address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-field">
                        <label htmlFor="password" className="signup-label">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="new-password"
                            className="signup-input"
                        />
                    </div>

                    <div className="signup-field">
                        <label htmlFor="confirmPassword" className="signup-label">
                            Confirm Password
                        </label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            autoComplete="new-password"
                            className="signup-input"
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="signup-error">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="signup-button"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <p className="signup-login">
                    Already a member?{' '}
                    <button onClick={() => navigate("/")} className="login-button">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
