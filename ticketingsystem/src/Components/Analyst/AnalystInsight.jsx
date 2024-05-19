import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const AnalystInsight = () => {
    const [message, setMessage] = useState('');
    const [selectedAnalyst, setSelectedAnalyst] = useState(null);

    // Simulăm datele pentru analiști, în practică acestea ar veni de la server
    const analysts = [
        { id: 1, name: 'Analyst 1', tickets: 15, activeTickets: 4, email: 'analyst1@example.com', role: 'L1' },
        { id: 2, name: 'Analyst 2', tickets: 10, activeTickets: 2, email: 'analyst2@example.com', role: 'L2' },
        { id: 3, name: 'Analyst 3', tickets: 20, activeTickets: 5, email: 'analyst3@example.com', role: 'L3' },
    ];

    const handleContactClick = (analyst) => {
        setSelectedAnalyst(analyst);
    };

    const handleSendMessage = () => {
        console.log(`Mesaj trimis către ${selectedAnalyst.name}: ${message}`);
        setMessage('');
        setSelectedAnalyst(null);
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
                                            <td>{analyst.name}</td>
                                            <td>{analyst.tickets}</td>
                                            <td>{analyst.activeTickets}</td>
                                            <td>{analyst.email}</td>
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
                                <h5 className="modal-title">Trimite un mesaj către {selectedAnalyst.name}</h5>
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
