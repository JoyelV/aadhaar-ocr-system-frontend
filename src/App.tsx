import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AadhaarUpload from './components/AadhaarUpload/AadhaarUpload';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import History from './components/History/History';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <GuestRoute>
                  <Dashboard />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <AadhaarUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <ToastContainer aria-label="Toast Notifications" />
        </div>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} />

    </AuthProvider>
  );
};

export default App;