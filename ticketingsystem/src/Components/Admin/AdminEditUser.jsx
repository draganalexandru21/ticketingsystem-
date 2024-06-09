import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminEditUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [originalEmail, setOriginalEmail] = useState('');
    const [user, setUser] = useState({
        id: '',
        username: '',
        mail: '',
        password: '',
        role: 'EMPLOYEE',
        active: true,
        createdDate: '',
        updatedDate: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state && location.state.user) {
            setUser(location.state.user);
            setOriginalEmail(location.state.user.mail);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/v1/updateUser/${originalEmail}`, user);
            alert("User updated successfully!");
            navigate('/admin/users');
        } catch (error) {
            console.error("There was an error updating the user!", error);
            setError(error.response.data); // Display error message
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit User</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        value={user.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mail" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="mail"
                        name="mail"
                        value={user.mail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="ANALYST">Analyst</option>
                    </select>
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="active"
                        name="active"
                        checked={user.active}
                        onChange={() => setUser(prevState => ({ ...prevState, active: !prevState.active }))}
                    />
                    <label className="form-check-label" htmlFor="active">Active</label>
                </div>
                <button type="submit" className="btn btn-primary">Update User</button>
            </form>
        </div>
    );
};

export default AdminEditUser;
