import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const EmployeeSubmit = () => {
    const [ticket, setTicket] = useState({
        title: '',
        details: '',
        employee: { id: null },
    });
    const [additionalComments, setAdditionalComments] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [priority, setPriority] = useState('');
    const [type, setType] = useState('');
    const fileInputRef = useRef(null);
    
    useEffect(() => {
        populateUserDetails();
    }, []);

    const populateUserDetails = () => {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');

        const user = {
            id: userId,
            username: username,
            email: email,
            role: role,
        };

        console.log('Logged-in user details:', user);

        if (userId) {
            setTicket(prevTicket => ({
                ...prevTicket,
                employee: { id: userId }
            }));
        } else {
            setError('User ID not found in localStorage.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
    };

    const handleCommentsChange = (e) => {
        setAdditionalComments(e.target.value);
    };

    const handleFileChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setPriority('');
        setType('');

        if (!ticket.title || !ticket.details) {
            setError('Title and details are required.');
            return;
        }

        const formData = new FormData();
        formData.append('ticket', new Blob([JSON.stringify(ticket)], { type: 'application/json' }));
        if (attachment) {
            formData.append('attachment', attachment);
        }
        if (additionalComments) {
            formData.append('additionalComments', additionalComments);
        }

        console.log('Submitting ticket:', ticket);
        try {
            const response = await axios.post('http://localhost:8080/api/v1/tickets', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setPriority(response.data.priority);
            setType(response.data.type);

            setSuccess('Ticket submitted successfully!');
            setTicket({
                title: '',
                details: '',
                employee: { id: localStorage.getItem('userId') },
            });
            setAdditionalComments('');
            setAttachment(null);
            fileInputRef.current.value = ''; 
        } catch (error) {
            console.error('There was an error submitting the ticket!', error);
            setError('There was an error submitting the ticket!');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Submit a Ticket</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {priority && <div className="alert alert-info">Priority: {priority}</div>}
            {type && <div className="alert alert-info">Type: {type}</div>}
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={ticket.title} onChange={handleInputChange} placeholder="Title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">Details</label>
                    <textarea className="form-control" id="details" name="details" value={ticket.details} onChange={handleInputChange} placeholder="Details" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="additionalComments" className="form-label">Additional Comments</label>
                    <textarea className="form-control" id="additionalComments" name="additionalComments" value={additionalComments} onChange={handleCommentsChange} placeholder="Additional Comments" />
                </div>
                <div className="mb-3">
                    <label htmlFor="attachment" className="form-label">Attachment (optional)</label>
                    <input className="form-control" type="file" id="attachment" ref={fileInputRef} onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeSubmit;
