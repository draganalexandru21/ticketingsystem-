import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const EmployeeTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
    }, [filter]);

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const employeeId = localStorage.getItem('userId');

            if (!employeeId) {
                throw new Error('Employee ID is null');
            }

            const response = await axios.get(`http://localhost:8080/api/v1/tickets/employee/${employeeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            let filteredTickets = response.data;
            if (filter !== 'ALL') {
                filteredTickets = filteredTickets.filter(ticket => ticket.status === filter);
            }

            setTickets(filteredTickets);
        } catch (error) {
            console.error("There was an error fetching the tickets!", error);
            setError('There was an error fetching the tickets.');
            if (error.response && error.response.status === 403) {
                navigate('/login');
            }
        }
    };

    const handleDetail = (ticketId) => {
        navigate(`/user/ticket/${ticketId}`);
    };

    const handleClose = (ticket) => {
        setSelectedTicket(ticket);
    };

    const confirmClose = async () => {
        if (selectedTicket) {
            try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:8080/api/v1/tickets/${selectedTicket.id}/status`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        status: 'CLOSED'
                    }
                });

                setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'CLOSED' } : t));
                setSelectedTicket(null);
            } catch (error) {
                console.error("There was an error closing the ticket!", error);
                setError('There was an error closing the ticket.');
            }
        }
    };

    const cancelClose = () => {
        setSelectedTicket(null);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="container mt-4">
            <h2>My Tickets</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label htmlFor="filter" className="form-label">Filter Tickets by Status:</label>
                <select id="filter" className="form-select" value={filter} onChange={handleFilterChange}>
                    <option value="ALL">All</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>

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
                                    <button className="btn btn-outline-danger" type="button" onClick={() => handleClose(ticket)}>Close</button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Modal 
                isOpen={selectedTicket !== null} 
                onRequestClose={cancelClose} 
                contentLabel="Confirm Close Ticket"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <h2>Confirm Close</h2>
                <p>Are you sure you want to close the ticket: {selectedTicket?.title}?</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger me-2" onClick={confirmClose}>Yes</button>
                    <button className="btn btn-secondary" onClick={cancelClose}>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default EmployeeTickets;
