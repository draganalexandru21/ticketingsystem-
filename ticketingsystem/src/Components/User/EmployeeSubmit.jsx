// EmployeeSubmitTicket.jsx
import React, { useState } from 'react';

const EmployeeSubmit = () => {
     const [ticket, setTicket] = useState({
        title: '',
        type: 'Hardware', // Presupunem că "Hardware" este valoarea implicită
        details: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket({
            ...ticket,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aici s-ar adăuga logica pentru a trimite datele către backend
        console.log(ticket);
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
                <button type="submit" className="btn btn-primary">Submit Ticket</button>
            </form>
        </div>
    );
};

export default EmployeeSubmit;
