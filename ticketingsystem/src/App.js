import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSidebar from './Components/User/UserSidebar';
import EmployeeSubmit from './Components/User/EmployeeSubmit';
import EmployeeTickets from './Components/User/EmployeeTickets';
import EmployeeTicketDetail from './Components/User/EmployeeTicketDetail';
import AdminSidebar from './Components/Admin/AdminSidebar';
import AdminManageUser from './Components/Admin/AdminManageUser';
import AdminEditUser from './Components/Admin/AdminEditUser';
import AdminAddUser from './Components/Admin/AdminAddUser';
import AnalystSidebar from './Components/Analyst/AnalystSidebar';
import AnalystTickets from './Components/Analyst/AnalystTickets';
import AnalystTicketDetail from './Components/Analyst/AnalystTicketDetail';
import AnalystDashboard from './Components/Analyst/AnalystDashboard';
import AnalystInsight from './Components/Analyst/AnalystInsight';
import AnalystMails from './Components/Analyst/AnalystMails';
import EmployeeMails from './Components/User/EmployeeMails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/analyst/*" element={<AnalystLayout />} />
          <Route path="/user/*" element={<UserLayout />} />
          <Route path="/*" element={<UserLayout />} /> {/* Default to UserLayout */}
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
        <Route path="submit" element={<EmployeeSubmit />} />
        <Route path="tickets" element={<EmployeeTickets />} />
        <Route path="ticket/:id" element={<EmployeeTicketDetail />} />
        <Route path="mails" element={<EmployeeMails />} />
      </Routes>
    </div>
  </div>
);

const AdminLayout = () => (
  <div className="d-flex">
    <AdminSidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="users" element={<AdminManageUser />} />
        <Route path="add-user" element={<AdminAddUser />} />
        <Route path="edit-user/:id" element={<AdminEditUser />} />
      </Routes>
    </div>
  </div>
);

const AnalystLayout = () => (
  <div className="d-flex">
    <AnalystSidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="dashboard" element={<AnalystDashboard />} />
        <Route path="tickets" element={<AnalystTickets />} />
        <Route path="ticket/:id" element={<AnalystTicketDetail />} />
        <Route path="insights" element={<AnalystInsight />} />
        <Route path="mails" element={<AnalystMails />} />
      </Routes>
    </div>
  </div>
);

export default App;
