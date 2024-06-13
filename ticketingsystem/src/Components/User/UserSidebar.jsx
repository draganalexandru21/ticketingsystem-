import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserSidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8080/api/v1/notifications/unread/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUnreadCount(response.data.length);
    };

    fetchUnreadNotifications();
  }, []);

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
          {unreadCount > 0 && <span className="badge badge-danger ml-2">{unreadCount}</span>}
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
