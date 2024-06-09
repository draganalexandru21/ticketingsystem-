import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminManageUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                console.log("Sending JWT Token: ", token); // Log the token being sent

                const response = await axios.get('http://localhost:8080/api/v1/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleEdit = (user) => {
        navigate('/admin/edit-user', { state: { user } });
    };

    const handleDelete = async (mail) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8080/api/v1/deleteUser/${mail}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsers(users.filter(u => u.mail !== mail));
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return isNaN(date) ? 'Invalid Date' : date.toLocaleString();
    };

    return (
        <div className="container mt-4">
            <h2>Manage Users</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.mail}</td>
                            <td>{user.role}</td>
                            <td>{user.active ? "Yes" : "No"}</td>
                            <td>{formatDate(user.createdDate)}</td>
                            <td>{formatDate(user.updatedDate)}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => handleEdit(user)} disabled={user.role === 'ADMIN'}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.mail)} disabled={user.role === 'ADMIN'}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageUsers;
