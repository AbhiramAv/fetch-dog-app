// Login.tsx

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import styled from 'styled-components';

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

const Login: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Basic form validation
    if (name.trim() === '' || email.trim() === '') {
      setError('Name and email are required.');
      return;
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      setError('Name should contain only alphabets.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    // Clear previous errors
    setError('');

    // Pass individual properties
    login(name, email);
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
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
      <Button onClick={handleLogin}>Login</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
};

export default Login;
