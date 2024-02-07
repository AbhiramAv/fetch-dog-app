import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    login(name, email);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
