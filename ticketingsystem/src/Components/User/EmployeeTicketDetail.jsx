import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeTicketDetail = () => {
    const { id } = useParams(); // ID-ul tichetului din URL
    const [message, setMessage] = useState(""); // Starea pentru mesajul nou
    const [attachment, setAttachment] = useState(null); // Starea pentru atașament

    // Simulație de date ale tichetului, în producție acestea ar veni de la server
    const ticketDetails = {
        id: id,
        title: 'Laptop nu porneste',
        analyst: "Analyst1",
        status: 'Deschis',
        summary: 'Laptop-ul model XYZ nu se aprinde de la buton.',
        dateOpened: '2022-07-14',
        conversation: [
            { from: "Employee", message: "Buna ziua, am o problema cu laptopul.", timestamp: '2022-07-14 10:00', attachment: null },
            { from: "Analyst1", message: "Buna ziua, am primit mesajul dumneavoastră.", timestamp: '2022-07-14 10:05', attachment: 'diagnostic_report.pdf' },
            // ... alte mesaje
        ],
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aici veți adăuga logica de trimitere a mesajului și atașamentului către server
        const formData = new FormData();
        formData.append('message', message);
        if (attachment) {
            formData.append('attachment', attachment);
        }

        // Exemple de trimitere a datelor (folosind fetch sau axios)
        // fetch('/api/tickets/${id}/messages', {
        //     method: 'POST',
        //     body: formData,
        // }).then(response => response.json())
        //   .then(data => console.log(data))
        //   .catch(error => console.error('Error:', error));

        console.log("Mesaj trimis: ", message, attachment ? `cu atașament: ${attachment.name}` : "fără atașament");
        setMessage(""); // Resetați inputul după trimitere
        setAttachment(null); // Resetați atașamentul după trimitere
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    Detalii Tichet #{ticketDetails.id}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{ticketDetails.title}</h5>
                    <p className="card-text">{ticketDetails.summary}</p>
                    <p className="card-text">Status: {ticketDetails.status}</p>
                    <p className="card-text">Analyst: {ticketDetails.analyst}</p>
                    <p className="card-text"><small className="text-muted">Deschis la: {ticketDetails.dateOpened}</small></p>
                    <hr />
                    <h6 className="card-title">Conversație:</h6>
                    <div className="conversation">
                        {ticketDetails.conversation.map((entry, index) => (
                            <div key={index} className="message-entry mb-3">
                                <strong>{entry.from}:</strong> {entry.message}
                                <br />
                                {entry.attachment && 
                                    <div>
                                        <strong>Attachment:</strong> <a href={`/attachments/${entry.attachment}`} target="_blank" rel="noopener noreferrer">{entry.attachment}</a>
                                    </div>
                                }
                                <small className="text-muted">{entry.timestamp}</small>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTicketDetail;
