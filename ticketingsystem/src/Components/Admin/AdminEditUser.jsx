import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AdminEditUser.css'; // Asigurați-vă că stilurile nu intră în conflict cu Bootstrap

const AdminEditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    // Simulăm preluarea detaliilor utilizatorului de la server
    const fetchedUser = {
      id: id,
      username: `User${id}`,
      email: `user${id}@example.com`,
      password: '*******',
      role: id % 2 === 0 ? 'Employee' : 'Analyst' // Simplă logică pentru simulare
    };
    setUser(fetchedUser);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aici veți adăuga logica pentru a trimite datele către backend
    console.log(user);
  };

  return (
    <div className="container mt-4">
      <h2>Edit User {id}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">ID:</label>
          <input type="text" className="form-control" id="userId" placeholder="User ID" value={user.id} readOnly />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role:</label>
          <select className="form-select" id="role" name="role" value={user.role} onChange={handleChange}>
            <option value="Analyst">Analyst</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-danger">Delete User</button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditUser;
