import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginForm.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoginForm = () => {
  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="card login-card">
        <div className="card-header text-center">
          <h3 className="text-dark">Log in</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" required />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="rememberMe" />
              <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <div className="text-center mt-3">
              <NavLink to="/forgot-password">Forgot Password?</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
