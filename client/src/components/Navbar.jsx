import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard, Home } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-header">
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>P</span>
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>PrimeTrade Intern</span>
                </Link>
                <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0, padding: 0, alignItems: 'center' }}>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcome, {user && user.name}</span>
                            </li>
                            <li>
                                <Link to="/dashboard" className="btn btn-outline" style={{ border: 'none', color: 'var(--text-color)' }}>
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Register</Link>
                            </li>
                            <li>
                                <Link to="/login" className="btn btn-primary">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
