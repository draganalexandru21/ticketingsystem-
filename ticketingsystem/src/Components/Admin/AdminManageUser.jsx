import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminManageUser.css'; // CSS personalizat pentru această componentă

const AdminManageUser = () => {
    const navigate = useNavigate();

    // Date simulate pentru utilizatori
    const users = [
        { id: 1, username: 'User1', email: 'user1@example.com', password: '*******', role: 'Analyst' },
        { id: 2, username: 'User2', email: 'user2@example.com', password: '*******', role: 'Employee' },
        { id: 3, username: 'User3', email: 'user3@example.com', password: '*******', role: 'Analyst' },
        { id: 4, username: 'User4', email: 'user4@example.com', password: '*******', role: 'Employee' },
        { id: 5, username: 'User5', email: 'user5@example.com', password: '*******', role: 'Analyst' },
        { id: 6, username: 'User6', email: 'user6@example.com', password: '*******', role: 'Employee' },
        { id: 7, username: 'User7', email: 'user7@example.com', password: '*******', role: 'Analyst' },
    ];

    const handleEdit = (userId) => {
        navigate(`/admin/edit-user/${userId}`);
    };

    return (
        <div className="admin-manage-user-container">
            <h2>Manage Users</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn edit" onClick={() => handleEdit(user.id)}>Edit</button>
                                <button className="btn delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManageUser;
