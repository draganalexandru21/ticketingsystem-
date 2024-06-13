import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnalystTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTickets = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const analystId = localStorage.getItem('userId');
            if (!analystId) {
                throw new Error('Analyst ID is null');
            }

            const response = await axios.get(`http://localhost:8080/api/v1/tickets/analyst/${analystId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTickets(response.data);
        } catch (error) {
            console.error("There was an error fetching the tickets!", error);
            setError('There was an error fetching the tickets.');
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleDetail = (ticketId) => {
        navigate(`/analyst/ticket/${ticketId}`);
    };

    const handleClose = async (ticketId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/v1/tickets/${ticketId}/status`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    status: 'CLOSED'
                }
            });
            setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'CLOSED' } : t));
        } catch (error) {
            console.error("There was an error closing the ticket!", error);
            setError('There was an error closing the ticket.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Analyst Tickets</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="tickets-list">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>Tichet #{ticket.id} - {ticket.status}</div>
                            <div>
                                <span className="badge bg-primary me-2">Proprietar: {ticket.employee.username}</span>
                                <span className="badge bg-primary me-2">Analyst: {ticket.analyst ? ticket.analyst.username : 'N/A'}</span>
                                <span className="badge bg-primary">Prioritate: {ticket.priority}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{ticket.title}</h5>
                            <p className="card-text">{ticket.details}</p>
                            <p className="card-text"><small className="text-muted">Deschis la: {new Date(ticket.createdAt).toLocaleString()}</small></p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-outline-info me-md-2" type="button" onClick={() => handleDetail(ticket.id)}>Info</button>
                                {ticket.status !== 'CLOSED' && (
                                    <button className="btn btn-outline-danger" type="button" onClick={() => handleClose(ticket.id)}>Close</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalystTickets;
