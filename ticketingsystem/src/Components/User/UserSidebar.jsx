import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './UserSidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column vh-100 sidebar">
      <div className="text-white text-center py-custom">Employee Panel</div>

      <div className="my-auto">
        <NavLink to="/user/tickets" className="btn btn-light w-100 mb-3">
          <i className="fas fa-ticket-alt"></i> My Tickets
        </NavLink>
        <NavLink to="/user/submit" className="btn btn-light w-100 mb-3">
          <i className="fas fa-plus"></i> Submit a ticket
        </NavLink>
        <NavLink to="/user/mails" className="btn btn-light w-100 mb-3">
          <i className="fas fa-envelope"></i> Mails
        </NavLink>
      </div>

      <div className="mt-auto p-2">
        <button onClick={handleLogout} className="btn bg-secondary text-white w-100">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;
