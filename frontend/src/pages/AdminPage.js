// src/pages/AdminPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import TimetableManagement from '../components/TimetableManagement';
import TeacherManagement from '../components/TeacherManagement';
import SubstitutionManagement from '../components/SubstitutionManagement';
import ClassManagement from '../components/ClassManagement';

const AdminPage = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: 240, width: '100%' }}>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timetable" element={<TimetableManagement />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/substitution" element={<SubstitutionManagement />} />
            <Route path="/classes" element={<ClassManagement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminPage;
