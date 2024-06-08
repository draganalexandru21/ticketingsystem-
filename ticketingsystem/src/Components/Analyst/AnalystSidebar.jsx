import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AnalystSidebar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AnalystSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column vh-100 sidebar">
            <div className="text-white text-center py-custom">Analyst Panel</div>

            <div className="my-auto">
                <NavLink to="/analyst/tickets" className="btn btn-light w-100 mb-3" activeClassName="active-link" exact>
                    <i className="fas fa-ticket-alt"></i> Tickets
                </NavLink>
                <NavLink to="/analyst/dashboard" className="btn btn-light w-100 mb-3" activeClassName="active-link" exact>
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                </NavLink>
                <NavLink to="/analyst/insights" className="btn btn-light w-100 mb-3" activeClassName="active-link" exact>
                    <i className="fas fa-chart-line"></i> Insights
                </NavLink>
                <NavLink to="/analyst/mails" className="btn btn-light w-100 mb-3" activeClassName="active-link" exact>
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

export default AnalystSidebar;
