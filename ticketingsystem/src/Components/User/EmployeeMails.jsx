import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EmployeeMails.css';

const EmployeeMails = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/v1/notifications/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setNotifications(response.data);
        };

        fetchNotifications();
    }, []);

    const handleNotificationClick = async (notificationId, ticketId) => {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:8080/api/v1/notifications/${notificationId}/read`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Update the notifications state to reflect the read status
        setNotifications(notifications.map(notification => 
            notification.id === notificationId ? { ...notification, opened: true } : notification
        ));

        // Navigate to the ticket details
        navigate(`/user/ticket/${ticketId}`);
        window.location.reload();
    };

    const sortedNotifications = notifications.sort((a, b) => a.opened - b.opened);

    return (
        <div className="container mt-4">
            <h2>Notifications</h2>
            <div className="notifications-list">
                {sortedNotifications.map((notification) => (
                    <div 
                        key={notification.id} 
                        className={`card mb-3 ${notification.opened ? 'bg-light' : 'bg-warning'}`} 
                        onClick={() => handleNotificationClick(notification.id, notification.ticketId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-header">
                            Ticket #{notification.ticketId} Notification
                        </div>
                        <div className="card-body">
                            <p className="card-text">{notification.message}</p>
                            <p className="card-text"><small className="text-muted">Date: {new Date(notification.createdAt).toLocaleString()}</small></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeMails;
