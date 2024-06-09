import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthResponse from '../../Models/AuthResponse';
import User from '../../Models/User';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const user = new User(data.id, data.username, data.mail, data.role);
      const authResponse = new AuthResponse(data.token, user, data.mail, data.role, data.active);

      localStorage.setItem('token', authResponse.token);
      localStorage.setItem('role', authResponse.role);
      const userRole = authResponse.role;

      if (userRole === 'ADMIN') {
        navigate('/admin/users');
      } else if (userRole === 'ANALYST') {
        navigate('/analyst/dashboard');
      } else if (userRole === 'EMPLOYEE') {
        navigate('/user/tickets');
      }
    } catch (error) {
      console.error('There was a problem with the login request:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <div className="card-header text-center">
          <h3 className="text-primary">Log in</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;