import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AnalystSidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AnalystSidebar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

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

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column vh-100 sidebar">
      <div className="text-white text-center py-custom">Analyst Panel</div>

      <div className="my-auto">
        <NavLink to="/analyst/tickets" className="btn btn-light w-100 mb-3">
          <i className="fas fa-ticket-alt"></i> My Tickets
        </NavLink>
        <NavLink to="/analyst/dashboard" className="btn btn-light w-100 mb-3">
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </NavLink>
        <NavLink to="/analyst/insights" className="btn btn-light w-100 mb-3">
          <i className="fas fa-chart-line"></i> Insights
        </NavLink>
        <NavLink to="/analyst/mails" className="btn btn-light w-100 mb-3">
          <i className="fas fa-envelope"></i> Mails
          {unreadCount > 0 && <span className="badge badge-danger">{unreadCount}</span>}
        </NavLink>
        <NavLink to="/analyst/alltickets" className="btn btn-light w-100 mb-3">
          <i className="fas fa-ticket-alt"></i>All Tickets
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

export default AnalystSidebar;
