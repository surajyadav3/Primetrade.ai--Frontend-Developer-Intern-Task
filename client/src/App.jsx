import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// Simple Landing
const Landing = () => (
  <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Master Your Productivity</h1>
    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
      A powerful task management dashboard built for the modern professional. Secure, fast, and beautiful.
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
      <a href="/register" className="btn btn-primary">Get Started</a>
      <a href="/login" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>Login</a>
    </div>

    <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      <div className="card">
        <h3>🚀 Fast & Secure</h3>
        <p style={{ color: 'var(--text-muted)' }}>Built with Node.js and React for top-tier performance.</p>
      </div>
      <div className="card">
        <h3>🔒 Encrypted</h3>
        <p style={{ color: 'var(--text-muted)' }}>Your data is safe with industry standard bcrypt hashing.</p>
      </div>
      <div className="card">
        <h3>✨ Modern UI</h3>
        <p style={{ color: 'var(--text-muted)' }}>Glassmorphism design for a premium user experience.</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
