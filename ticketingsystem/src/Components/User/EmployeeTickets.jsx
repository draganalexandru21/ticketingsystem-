import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeTickets = () => {
    const navigate = useNavigate();
    
    // Aici veți prelua lista de tichete, pentru simulare vom folosi un array static
    const tickets = [
        { id: 1, title: 'Laptop nu porneste', analyst: "Analyst1", status: 'Deschis', summary: 'Laptop-ul model XYZ nu se aprinde de la buton.', dateOpened: '2022-07-14' },
        { id: 2, title: 'Eroare VPN', analyst: "Analyst2", status: 'In curs', summary: 'Conexiunea VPN se deconecteaza frecvent.', dateOpened: '2022-07-15' },
        { id: 3, title: 'Laptop nu porneste', analyst: "Analyst1", status: 'Deschis', summary: 'Laptop-ul model XYZ nu se aprinde de la buton.', dateOpened: '2022-07-14' },
        { id: 4, title: 'Eroare VPN', analyst: "Analyst2", status: 'In curs', summary: 'Conexiunea VPN se deconecteaza frecvent.', dateOpened: '2022-07-15' },
        { id: 5, title: 'Laptop nu porneste', analyst: "Analyst1", status: 'Deschis', summary: 'Laptop-ul model XYZ nu se aprinde de la buton.', dateOpened: '2022-07-14' },
        { id: 6, title: 'Eroare VPN', analyst: "Analyst2", status: 'In curs', summary: 'Conexiunea VPN se deconecteaza frecvent.', dateOpened: '2022-07-15' },
    ];

    const handleDetail = (ticketId) => {
        navigate(`/user/ticket/${ticketId}`);
    };

    return (
        <div className="container mt-4">
            <h2>My Tickets</h2>
            <div className="tickets-list">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="card mb-3">
                        <div className="card-header">
                            Tichet #{ticket.id} - {ticket.status}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{ticket.title}</h5>
                            <p className="card-text">Analyst: {ticket.analyst}</p>
                            <p className="card-text">{ticket.summary}</p>
                            <p className="card-text"><small className="text-muted">Deschis la: {ticket.dateOpened}</small></p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-outline-info me-md-2" type="button" onClick={() => handleDetail(ticket.id)}>Info</button>
                                <button className="btn btn-outline-danger" type="button">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployeeTickets;
