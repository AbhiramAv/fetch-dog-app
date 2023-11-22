import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import styled from 'styled-components';

// Styled components for styling the Login component
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

// Login component definition
const Login: React.FC = () => {
  // Use the login function from the AuthContext
  const { login } = useAuth();
  
  // State for name, email, and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Handle the login button click
  const handleLogin = () => {
    // Basic form validation
    if (name.trim() === '' || email.trim() === '') {
      setError('Name and email are required.');
      return;
    }

    // Validate name using regular expression
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      setError('Name should contain only alphabets.');
      return;
    }

    // Validate email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    // Clear previous errors
    setError('');

    // Call the login function with name and email
    login(name, email);
  };

  // Render the Login component
  return (
    <LoginContainer>
      <Title>Login</Title>
      {/* Input fields for name and email */}
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Button to trigger the login process */}
      <Button onClick={handleLogin}>Login</Button>
      {/* Display error message if any */}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
};

export default Login;
