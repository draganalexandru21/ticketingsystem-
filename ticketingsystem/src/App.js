import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserSidebar from './Components/User/UserSidebar';
import EmployeeSubmit from './Components/User/EmployeeSubmit';
import EmployeeTickets from './Components/User/EmployeeTickets';
import EmployeeTicketDetail from './Components/User/EmployeeTicketDetail';
import AdminSidebar from './Components/Admin/AdminSidebar';
import AdminManageUsers from './Components/Admin/AdminManageUser';
import AdminEditUser from './Components/Admin/AdminEditUser';
import AdminAddUser from './Components/Admin/AdminAddUser';
import AnalystSidebar from './Components/Analyst/AnalystSidebar';
import AnalystTickets from './Components/Analyst/AnalystTickets';
import AnalystTicketDetail from './Components/Analyst/AnalystTicketDetail';
import AnalystDashboard from './Components/Analyst/AnalystDashboard';
import AnalystInsight from './Components/Analyst/AnalystInsight';
import AnalystMails from './Components/Analyst/AnalystMails';
import EmployeeMails from './Components/User/EmployeeMails';
import LoginForm from './Components/LoginForm/LoginForm';
import PrivateRoute from './routes/PrivateRoute';
import AnalystAllTickets from './Components/Analyst/AnalystAllTickets';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/analyst/*" element={<AnalystLayout />} />
          <Route path="/user/*" element={<UserLayout />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

const UserLayout = () => (
  <div className="d-flex">
    <UserSidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="submit" element={<PrivateRoute element={EmployeeSubmit} allowedRoles={['EMPLOYEE']} />} />
        <Route path="tickets" element={<PrivateRoute element={EmployeeTickets} allowedRoles={['EMPLOYEE']} />} />
        <Route path="ticket/:id" element={<PrivateRoute element={EmployeeTicketDetail} allowedRoles={['EMPLOYEE']} />} />
        <Route path="mails" element={<PrivateRoute element={EmployeeMails} allowedRoles={['EMPLOYEE']} />} />
      </Routes>
    </div>
  </div>
);

const AdminLayout = () => (
  <div className="d-flex">
    <AdminSidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="users" element={<PrivateRoute element={AdminManageUsers} allowedRoles={['ADMIN']} />} />
        <Route path="add-user" element={<PrivateRoute element={AdminAddUser} allowedRoles={['ADMIN']} />} />
        <Route path="edit-user" element={<PrivateRoute element={AdminEditUser} allowedRoles={['ADMIN']} />} />
      </Routes>
    </div>
  </div>
);

const AnalystLayout = () => (
  <div className="d-flex">
    <AnalystSidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="dashboard" element={<PrivateRoute element={AnalystDashboard} allowedRoles={['ANALYST']} />} />
        <Route path="tickets" element={<PrivateRoute element={AnalystTickets} allowedRoles={['ANALYST']} />} />
        <Route path="ticket/:id" element={<PrivateRoute element={AnalystTicketDetail} allowedRoles={['ANALYST']} />} />
        <Route path="insights" element={<PrivateRoute element={AnalystInsight} allowedRoles={['ANALYST']} />} />
        <Route path="mails" element={<PrivateRoute element={AnalystMails} allowedRoles={['ANALYST']} />} />
        <Route path="alltickets" element={<PrivateRoute element={AnalystAllTickets} allowedRoles={['ANALYST']} />} />
      </Routes>
    </div>
  </div>
);

export default App;
