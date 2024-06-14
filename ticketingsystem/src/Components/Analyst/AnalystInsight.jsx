import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AnalystInsight = () => {
    const [message, setMessage] = useState('');
    const [ticketId, setTicketId] = useState('');
    const [selectedAnalyst, setSelectedAnalyst] = useState(null);
    const [analysts, setAnalysts] = useState([]);

    useEffect(() => {
        const fetchAnalysts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/analysts');
                setAnalysts(response.data);
            } catch (error) {
                console.error('There was an error fetching the analysts!', error);
            }
        };

        fetchAnalysts();
    }, []);

    const handleContactClick = (analyst) => {
        setSelectedAnalyst(analyst);
    };

    const handleSendMessage = async () => {
        if (!selectedAnalyst) return;

        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/api/v1/notifications/send`, null, {
                params: {
                    analystId: selectedAnalyst.id,
                    message: message,
                    ticketId: ticketId // Include ticketId in the params
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('');
            setTicketId('');
            setSelectedAnalyst(null);
        } catch (error) {
            console.error('There was an error sending the message!', error);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h2>Analyst Insights</h2>
            <div className="row mb-4">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header">
                            Tichete pe Analiști
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nume</th>
                                        <th>Număr Tichete</th>
                                        <th>Tichete Active</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Acțiuni</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analysts.map((analyst) => (
                                        <tr key={analyst.id}>
                                            <td>{analyst.username}</td>
                                            <td>{analyst.totalTickets}</td>
                                            <td>{analyst.activeTickets}</td>
                                            <td>{analyst.mail}</td>
                                            <td>{analyst.role}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleContactClick(analyst)}
                                                >
                                                    Contact
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedAnalyst && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Trimite un mesaj către {selectedAnalyst.username}</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setSelectedAnalyst(null)}
                                >
                                    <span><i className="fas fa-times"></i></span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Scrie mesajul tău aici..."
                                />
                                <input
                                    type="text"
                                    className="form-control mt-2"
                                    value={ticketId}
                                    onChange={(e) => setTicketId(e.target.value)}
                                    placeholder="Ticket ID (optional)"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedAnalyst(null)}
                                >
                                    Închide
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSendMessage}
                                >
                                    Trimite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalystInsight;
