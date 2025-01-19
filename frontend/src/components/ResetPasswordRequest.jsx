import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import API from "../api"; // Import your axios instance or API function
import styled from "styled-components"; // Import styled-components

const ResetPasswordRequest = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/reset-password-request", { email });
            window.alert(response.data.message); // Show success message
            navigate("/reset"); // Redirect to the reset route
        } catch (error) {
            setMessage(error.response?.data?.message || "Error sending reset token.");
        }
    };

    return (
        <Container>
            <Card>
                <Heading>Request Password Reset</Heading>
                <Form onSubmit={handleRequest}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit">Send Reset Link</Button>
                </Form>
                <Message>{message}</Message>
            </Card>
        </Container>
    );
};

// Styled components for inline CSS
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
    font-family: "Poppins", sans-serif;
`;

const Card = styled.div`
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.2);
    text-align: center;
    animation: fadeIn 1.5s ease-out;
`;

const Heading = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center; /* Center the fields horizontally */
`;

const Input = styled.input`
    width: 70%; /* Reduced the width to 70% for smaller inputs */
    padding: 8px 12px; /* Adjusted padding for smaller input fields */
    border-radius: 8px;
    border: 1px solid #ccc;
    outline: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
        border-color: #ff7e5f;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const Button = styled.button`
    padding: 10px;
    width: 70%; /* Reduced the width and padding of the button */
    border: none;
    border-radius: 8px;
    background: #ff7e5f;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 10px rgba(255, 126, 95, 0.2);
    margin-top: 10px;

    &:hover {
        background: #feb47b;
        box-shadow: 0px 6px 12px rgba(254, 180, 123, 0.3);
    }
`;

const Message = styled.p`
    margin-top: 15px;
    color: red;
    font-size: 0.9rem;
`;

const fadeIn = `
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export default ResetPasswordRequest;
