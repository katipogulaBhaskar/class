import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.jsx";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/signup", formData);
            window.alert("Signup successful! Please log in.");
            navigate("/"); // Navigate to login after successful signup
        } catch (error) {
            setMessage("Signup failed. Try again.");
        }
    };

    return (
        <>
            <style>
                {`
                    /* Basic Reset */
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    /* Body */
                    body {
                        font-family: 'Roboto', sans-serif;
                        background: linear-gradient(135deg, #00c6ff, #0072ff); /* Blue gradient */
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #fff;
                    }

                    /* Container for the form */
                    .container {
                        background: rgba(0, 0, 0, 0.6);
                        padding: 40px;
                        border-radius: 15px;
                        width: 100%;
                        max-width: 500px;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                        backdrop-filter: blur(10px); /* Beautiful blurred background */
                        text-align: center;
                        animation: fadeIn 1s ease-in-out;
                    }

                    /* Form Heading */
                    h2 {
                        font-size: 2.5rem;
                        margin-bottom: 20px;
                        color: #fff;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        text-shadow: 0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4);
                    }

                    /* Form Fields */
                    input {
                        width: 80%;
                        padding: 12px;
                        margin: 12px 0;
                        border-radius: 10px;
                        border: none;
                        background-color: #fff;
                        color: #333;
                        font-size: 1rem;
                        outline: none;
                        box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
                        transition: all 0.3s ease;
                    }

                    /* Focused input fields */
                    input:focus {
                        box-shadow: 0 0 8px rgba(0, 180, 255, 0.8);
                        border: 2px solid #00b0ff;
                    }

                    /* Submit Button */
                    button {
                        width: 70%;
                        padding: 15px;
                        background: linear-gradient(90deg, #ff6f61, #d30f1f); /* Gradient Red */
                        border: none;
                        border-radius: 50px;
                        font-size: 1.2rem;
                        color: #fff;
                        cursor: pointer;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                        transition: all 0.3s ease;
                    }

                    /* Button hover effect */
                    button:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                    }

                    /* Error Message */
                    p {
                        color: #ff4747;
                        margin-top: 10px;
                        font-weight: bold;
                    }

                    /* Signup Info Link */
                    p span {
                        color: #00b0ff;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }

                    p span:hover {
                        text-decoration: underline;
                    }

                    /* Responsive Styling */
                    @media (max-width: 768px) {
                        .container {
                            padding: 30px;
                        }

                        h2 {
                            font-size: 2rem;
                        }

                        input {
                            font-size: 0.9rem;
                        }

                        button {
                            font-size: 1rem;
                        }
                    }

                    /* Animations */
                    @keyframes fadeIn {
                        0% {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>

            <div className="container">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit">Signup</button>
                </form>
                {message && <p>{message}</p>}
                <p>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>Login here</span>
                </p>
            </div>
        </>
    );
};

export default Signup;
