import React, { useState } from 'react';

const EmployeeSubmit = () => {
    const [ticket, setTicket] = useState({
        title: '',
        type: 'Hardware', // Presupunem că "Hardware" este valoarea implicită
        details: '',
        priority: 1, // Presupunem că 1 este valoarea implicită
        attachment: null, // Starea pentru atașament
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in ticket) {
            formData.append(key, ticket[key]);
        }

        // Aici s-ar adăuga logica pentru a trimite datele către backend
        console.log(ticket);
        console.log("Atașament: ", ticket.attachment ? ticket.attachment.name : "Niciun atașament");
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
