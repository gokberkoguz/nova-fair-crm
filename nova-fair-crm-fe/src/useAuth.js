import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    navigate('/dashboard'); // Navigate to the dashboard page after successful login
  };

  return (
    <div>
      <h2>Login Page</h2>
      {/* Your login form */}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
