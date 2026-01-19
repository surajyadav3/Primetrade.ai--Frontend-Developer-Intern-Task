import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login, error } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '4rem 0' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Sign in to access your dashboard</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    {error}
                </div>}

                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label className="label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="input"
                                style={{ paddingLeft: '40px' }}
                                placeholder="••••••••"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign In <ArrowRight size={18} />
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
