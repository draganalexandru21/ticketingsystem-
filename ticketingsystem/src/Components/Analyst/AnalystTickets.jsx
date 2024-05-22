import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalystTickets = () => {
    const navigate = useNavigate();

    const tickets = [
        { id: 1, title: 'Review Ticket 1', owner: 'Employee1', analyst: 'Analyst1', status: 'Deschis', summary: 'Review the ticket for the laptop issue.', dateOpened: '2022-07-14', priority: 3 },
        { id: 2, title: 'Review Ticket 2', owner: 'Employee2', analyst: 'Analyst2', status: 'In curs', summary: 'Check the VPN connection issues.', dateOpened: '2022-07-15', priority: 2 },
        { id: 3, title: 'Review Ticket 3', owner: 'Employee3', analyst: 'Analyst3', status: 'Deschis', summary: 'Investigate the software installation error.', dateOpened: '2022-07-16', priority: 1 },
        { id: 4, title: 'Review Ticket 4', owner: 'Employee4', analyst: 'Analyst4', status: 'In curs', summary: 'Analyze the network latency problems.', dateOpened: '2022-07-17', priority: 4 },
        { id: 5, title: 'Review Ticket 5', owner: 'Employee5', analyst: 'Analyst5', status: 'Deschis', summary: 'Examine the hardware malfunction reports.', dateOpened: '2022-07-18', priority: 5 },
        { id: 6, title: 'Review Ticket 6', owner: 'Employee6', analyst: 'Analyst6', status: 'In curs', summary: 'Look into the database access issues.', dateOpened: '2022-07-19', priority: 3 },
    ];

    const handleDetail = (ticketId) => {
        navigate(`/analyst/ticket/${ticketId}`);
    };

    return (
        <div className="container mt-4">
            <h2>Analyst Tickets</h2>
            <div className="tickets-list">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="card mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>Tichet #{ticket.id} - {ticket.status}</div>
                            <div>
                                <span className="badge bg-primary me-2">Proprietar: {ticket.owner}</span>
                                <span className="badge bg-primary me-2">Analyst: {ticket.analyst}</span>
                                <span className="badge bg-primary">Prioritate: {ticket.priority}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{ticket.title}</h5>
                            <p className="card-text">{ticket.summary}</p>
                            <p className="card-text"><small className="text-muted">Deschis la: {ticket.dateOpened}</small></p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-outline-info me-md-2" type="button" onClick={() => handleDetail(ticket.id)}>Info</button>
                                <button className="btn btn-outline-danger" type="button">Close</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalystTickets;
