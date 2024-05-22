import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnalystMails.css';

const AnalystMails = () => {
    const navigate = useNavigate();

    // Simulăm notificările, în practică acestea ar veni de la server
    const initialNotifications = [
        { id: 1, ticketId: 1, message: 'Your ticket has been updated', date: '2022-07-15', opened: false },
        { id: 2, ticketId: 2, message: 'New message from Employee', date: '2022-07-16', opened: false },
        { id: 3, ticketId: 3, message: 'Your ticket has been closed', date: '2022-07-17', opened: true },
    ];

    const [notifications, setNotifications] = useState(initialNotifications);

    const handleNotificationClick = (notificationId, ticketId) => {
        // Actualizează starea notificărilor pentru a marca notificarea ca fiind deschisă
        setNotifications(notifications.map(notification => 
            notification.id === notificationId ? { ...notification, opened: true } : notification
        ));
        // Navighează la detaliile tichetului
        navigate(`/analyst/ticket/${ticketId}`);
    };

    // Sortăm notificările astfel încât cele nedeschise să fie primele
    const sortedNotifications = notifications.sort((a, b) => a.opened - b.opened);

    return (
        <div className="container mt-4">
            <h2>Notifications</h2>
            <div className="notifications-list">
                {sortedNotifications.map((notification) => (
                    <div 
                        key={notification.id} 
                        className={`card mb-3 ${notification.opened ? 'opened' : 'not-opened'}`} 
                        onClick={() => handleNotificationClick(notification.id, notification.ticketId)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card-header">
                            Ticket #{notification.ticketId} Notification
                        </div>
                        <div className="card-body">
                            <p className="card-text">{notification.message}</p>
                            <p className="card-text"><small className="text-muted">Date: {notification.date}</small></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalystMails;
