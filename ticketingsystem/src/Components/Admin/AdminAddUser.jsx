import React, { useState } from 'react';

const AdminAddUser = () => {
  const [user, setUser] = useState({
    username: '',
    mail: '',
    password: '',
    role: 'EMPLOYEE', // Default value in uppercase
    active: true
  });
  const [error, setError] = useState(''); // Adăugăm starea pentru eroare

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: name === 'role' ? value.toUpperCase() : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User added successfully');
        setUser({ username: '', mail: '', password: '', role: 'EMPLOYEE', active: true });
        setError(''); // Resetăm mesajul de eroare după succes
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New User</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Afișăm mesajul de eroare */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            placeholder="Email"
            value={user.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="ANALYST">Analyst</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">Add User</button>
          <button type="reset" className="btn btn-secondary" onClick={() => setUser({ username: '', mail: '', password: '', role: 'EMPLOYEE', active: true })}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUser;
