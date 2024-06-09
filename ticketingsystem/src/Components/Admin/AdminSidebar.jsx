import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminSidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column vh-100 sidebar">
      <div className="text-white text-center py-custom">Admin Panel</div>

      <div className="my-auto">
        <NavLink to="/admin/users" className="btn btn-light w-100 mb-3">
          <i className="fas fa-users-cog"></i> Manage Users
        </NavLink>
        <NavLink to="/admin/add-user" className="btn btn-light w-100 mb-3">
          <i className="fas fa-user-plus"></i> Add User
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

export default AdminSidebar;
