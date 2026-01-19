import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('http://localhost:5000/api/auth/user');
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            localStorage.removeItem('token');
            setAuthToken(null);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData, config);
            localStorage.setItem('token', res.data.token);
            await loadUser();
            setError(null);
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            throw err;
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData, config);
            localStorage.setItem('token', res.data.token);
            await loadUser();
            setError(null);
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
            throw err;
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                error,
                register,
                login,
                logout,
                setError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
