import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'; // <-- Import Link here
import API from "../api.jsx";
import styled, { keyframes } from "styled-components";

// Styled Components
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Body = styled.body`
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Container = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.4);
`;

const Input = styled.input`
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

  &:focus {
    box-shadow: 0 0 8px rgba(0, 180, 255, 0.8);
    border: 2px solid #00b0ff;
  }
`;

const Button = styled.button`
  width: 70%;
  padding: 15px;
  background: linear-gradient(90deg, #ff6f61, #d30f1f);
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Message = styled.p`
  color: #ff4747;
  margin-top: 10px;
  font-weight: bold;
`;

const SignupLink = styled.span`
  color: #00b0ff;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const ResetPasswordLink = styled(Link)`
  color: #00b0ff;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", formData);
      setIsLoggedIn(true); // Set the isLoggedIn state to true
      window.alert("Login successful!");
      navigate("/entroll");
    } catch (error) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <Body>
      <Container>
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit">Login</Button>
        </form>
        {message && <Message>{message}</Message>}
        <p>
          Don't have an account?{" "}
          <SignupLink onClick={() => navigate("/signup")}>Signup here</SignupLink>
        </p>
        {/* Now using the ResetPasswordLink */}
        <p>
          <ResetPasswordLink to="/reset-request">Reset Password</ResetPasswordLink>
        </p>
      </Container>
    </Body>
  );
};

export default Login;
