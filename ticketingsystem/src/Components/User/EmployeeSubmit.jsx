import React, { useState } from 'react';
import axios from 'axios';

const EmployeeSubmit = () => {
    const [ticket, setTicket] = useState({
        title: '',
        type: 'Hardware',
        details: '',
        priority: 1,
        attachment: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value,
        });
    };

    const handleAttachmentChange = (e) => {
        setTicket({
            ...ticket,
            attachment: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ticket', new Blob([JSON.stringify({
            title: ticket.title,
            type: ticket.type.toUpperCase(), // Convert to uppercase
            details: ticket.details,
            priority: ticket.priority,
        })], { type: 'application/json' }));
        if (ticket.attachment) {
            formData.append('attachment', ticket.attachment);
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/v1/tickets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Ticket submitted successfully:', response.data);
        } catch (error) {
            console.error('There was an error submitting the ticket!', error);
        }
    };

    
    return (
        <div className="container mt-4">
            <h2>Submit a Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={ticket.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={ticket.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select
                        className="form-select"
                        id="priority"
                        name="priority"
                        value={ticket.priority}
                        onChange={handleChange}
                        required
                    >
                        <option value={1}>1 - Low</option>
                        <option value={2}>2 - Medium</option>
                        <option value={3}>3 - High</option>
                        <option value={4}>4 - Urgent</option>
                        <option value={5}>5 - Critical</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details</label>
                    <textarea
                        className="form-control"
                        id="details"
                        name="details"
                        value={ticket.details}
                        onChange={handleChange}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment</label>
                    <input
                        className="form-control"
                        type="file"
                        id="attachment"
                        name="attachment"
                        onChange={handleAttachmentChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Ticket</button>
            </form>
        </div>
    );
};

export default EmployeeSubmit;
