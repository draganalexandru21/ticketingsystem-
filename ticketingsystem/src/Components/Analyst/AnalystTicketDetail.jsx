import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './AnalystTicketDetail.css';

const AnalystTicketDetail = () => {
    const { id } = useParams();
    const [ticketDetails, setTicketDetails] = useState(null);
    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [showCloseConfirm, setShowCloseConfirm] = useState(false);
    const [showReopenConfirm, setShowReopenConfirm] = useState(false);

    const fetchTicketDetails = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8080/api/v1/tickets/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setTicketDetails(response.data);
        } catch (error) {
            console.error("There was an error fetching the ticket details!", error);
        }
    }, [id]);

    useEffect(() => {
        fetchTicketDetails();
    }, [fetchTicketDetails]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('messageContent', message);
        formData.append('sender', localStorage.getItem('email'));
        if (attachment) {
            formData.append('attachment', attachment);
        }
    
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:8080/api/v1/tickets/${id}/conversation`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setMessage("");
            setAttachment(null);
            fetchTicketDetails();
        } catch (error) {
            console.error("There was an error sending the message!", error);
        }
    };
    

    const handleCloseTicket = () => {
        setShowCloseConfirm(true);
    };

    const handleReopenTicket = () => {
        setShowReopenConfirm(true);
    };

    const confirmCloseTicket = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/v1/tickets/${id}/status`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: {
                    status: 'CLOSED'
                }
            });
            setShowCloseConfirm(false);
            fetchTicketDetails();
        } catch (error) {
            console.error("There was an error closing the ticket!", error);
        }
    };

    const confirmReopenTicket = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/v1/tickets/${id}/reopen`, null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShowReopenConfirm(false);
            fetchTicketDetails();
        } catch (error) {
            console.error("There was an error reopening the ticket!", error);
        }
    };

    const cancelClose = () => {
        setShowCloseConfirm(false);
    };

    const cancelReopen = () => {
        setShowReopenConfirm(false);
    };

    const handleHelpClick = () => {
        alert('Ajutorul este pe drum!');
    };

    if (!ticketDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>Detalii Tichet #{ticketDetails.id}</div>
                    <div>
                        <span className="badge bg-primary me-2">Proprietar: {ticketDetails.employee ? ticketDetails.employee.username : 'N/A'}</span>
                        <span className="badge bg-primary me-2">Analyst: {ticketDetails.analyst ? ticketDetails.analyst.username : 'N/A'}</span>
                        <span className="badge bg-primary">Prioritate: {ticketDetails.priority}</span>
                    </div>
                </div>
                <div className="card-body">
                    <div className="ticket-detail-container">
                        <div className="ticket-detail-section">
                            <span className="detail-label">Title:</span>
                            <span className="detail-text">{ticketDetails.title}</span>
                        </div>
                        <div className="ticket-detail-section">
                            <span className="detail-label">Status:</span>
                            <span className="detail-text">{ticketDetails.status}</span>
                        </div>
                        <div className="ticket-detail-section">
                            <span className="detail-label">Type:</span>
                            <span className="detail-text">{ticketDetails.type}</span>
                        </div>
                        <div className="ticket-detail-section">
                            <span className="detail-label">Created At:</span>
                            <span className="detail-text">{new Date(ticketDetails.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="ticket-detail-section">
                            <span className="detail-label">Details:</span>
                            <span className="detail-text">{ticketDetails.details}</span>
                        </div>
                    </div>
                    <hr />
                    <h6 className="section-header">Conversație:</h6>
                    <div className="conversation">
                        {ticketDetails.conversation && ticketDetails.conversation.map((entry, index) => (
                            <div key={index} className="message-entry mb-3">
                                {entry.startsWith("Attachment: ") ? (
                                    <div>
                                        <strong>Attachment:</strong> <a href={`http://localhost:8080/${entry.replace("Attachment: ", "")}`} download>{entry.replace("Attachment: ", "")}</a>
                                    </div>
                                ) : (
                                    <div>
                                        <strong>{entry.split(":")[0]}:</strong> {entry.split(":").slice(1).join(":")}
                                    </div>
                                )}
                                <small className="text-muted">{new Date(ticketDetails.createdAt).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mesajul tău:</label>
                            <textarea 
                                className="form-control" 
                                id="message" 
                                rows="3" 
                                value={message} 
                                onChange={handleMessageChange}
                                placeholder="Scrie un mesaj aici...">
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="attachment" className="form-label">Atașament:</label>
                            <input 
                                className="form-control" 
                                type="file" 
                                id="attachment" 
                                onChange={handleAttachmentChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Send</button>
                        <button type="button" className="btn btn-outline-secondary ms-2" onClick={handleHelpClick}>Help</button>
                    </form>
                    {ticketDetails.status === 'CLOSED' ? (
                        <button className="btn btn-warning mt-3" onClick={handleReopenTicket}>Reopen Ticket</button>
                    ) : (
                        <button className="btn btn-danger mt-3" onClick={handleCloseTicket}>Close Ticket</button>
                    )}
                </div>
            </div>

            <Modal isOpen={showCloseConfirm} onRequestClose={cancelClose} contentLabel="Confirm Close Ticket" ariaHideApp={false} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } }}>
                <h2>Confirm Close</h2>
                <p>Are you sure you want to close the ticket: {ticketDetails.title}?</p>
                <button className="btn btn-danger" onClick={confirmCloseTicket}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelClose}>No</button>
            </Modal>

            <Modal isOpen={showReopenConfirm} onRequestClose={cancelReopen} contentLabel="Confirm Reopen Ticket" ariaHideApp={false} style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)' } }}>
                <h2>Confirm Reopen</h2>
                <p>Are you sure you want to reopen the ticket: {ticketDetails.title}?</p>
                <button className="btn btn-warning" onClick={confirmReopenTicket}>Yes</button>
                <button className="btn btn-secondary" onClick={cancelReopen}>No</button>
            </Modal>
        </div>
    );
};

export default AnalystTicketDetail;
