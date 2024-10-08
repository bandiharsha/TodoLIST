// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css'; // Import the CSS file

// export default function Login() {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(""); // State to hold the error message

//     const handleClick = async (e) => {
//         e.preventDefault(); // Prevent the default form submission
    
//         try {
//             const response = await axios.post('http://localhost:5000/login', {
//                 email: email,
//                 password: password,
//             });
    
//             if (response.status === 200) {
//                 const token = response.data.token; // Assuming the token is in the response data
//                 localStorage.setItem('token', token); // Store the token in local storage
//                 navigate('/todolist'); // Navigate to the landing page
//             } else {
//                 setError('Login failed');
//             }
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 setError('Invalid email or password'); // Set the error message from the server response
//             } else {
//                 console.error('An error occurred during login:', error);
//                 setError('An unexpected error occurred. Please try again later.');
//             }
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2 className="login-title">Sign in to your account</h2>
//                 <form onSubmit={handleClick} className="login-form">
//                     <div className="login-field">
//                         <label htmlFor="email" className="login-label">Email address</label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             id="email"
//                             name="email"
//                             type="email"
//                             required
//                             autoComplete="email"
//                             className="login-input"
//                         />
//                     </div>
//                     <div className="login-field">
//                         <label htmlFor="password" className="login-label">Password</label>
//                         <a href="#" className="login-forgot">Forgot password?</a>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             id="password"
//                             name="password"
//                             type="password"
//                             required
//                             autoComplete="current-password"
//                             className="login-input"
//                         />
//                     </div>
//                     {error && <div className="login-error">{error}</div>}
//                     <button type="submit" className="login-button">Sign in</button>
//                 </form>
//                 <p className="login-signup">
//                     Not a member?{' '}
//                     <button onClick={() => navigate("/signup")} className="signup-button">Sign Up</button>
//                 </p>
//             </div>
//         </div>
//     );
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Updated CSS file

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/todolist');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Invalid email or password');
            } else {
                console.error('An error occurred during login:', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="container">
            <div className="image-section">
                {/* You can add a logo or image here */}
                <img src="/path-to-react-logo.png" alt="React logo" className="react-logo" />
            </div>
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
