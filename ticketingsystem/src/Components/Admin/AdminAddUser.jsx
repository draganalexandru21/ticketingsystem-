import React, { useState } from 'react';

const AdminAddUser = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Employee' // Valoarea implicită pentru rol
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aici veți adăuga logica pentru a trimite datele către backend
    console.log('User added:', user);
    // Resetare formular după trimitere
    setUser({
      username: '',
      email: '',
      password: '',
      role: 'Employee'
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New User</h2>
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
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            value={user.email}
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
            <option value="Analyst">Analyst</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">Add User</button>
          <button type="reset" className="btn btn-secondary" onClick={() => setUser({ username: '', email: '', password: '', role: 'Employee' })}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddUser;
