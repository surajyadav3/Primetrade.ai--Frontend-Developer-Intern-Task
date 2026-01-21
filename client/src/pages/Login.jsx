import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await login(formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card w-full max-w-md bg-base-200 shadow-2xl border border-white/5"
            >
                <div className="card-body">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Welcome Back</h2>
                        <p className="text-base-content/60 mt-2">Elevate your trading intelligence</p>
                    </div>

                    {error && (
                        <div className="alert alert-error shadow-lg mb-6 py-2 px-4 rounded-xl text-sm">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold uppercase text-[10px] tracking-widest opacity-50">Email Address</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    className="input input-bordered w-full pl-12 rounded-xl focus:input-primary transition-all bg-base-300/50 border-white/5"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-right">
                                <span className="label-text font-semibold uppercase text-[10px] tracking-widest opacity-50">Password</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    className="input input-bordered w-full pl-12 rounded-xl focus:input-primary transition-all bg-base-300/50 border-white/5"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full rounded-xl transition-all shadow-lg shadow-primary/20 mt-4 h-12 ${submitting ? 'btn-disabled' : ''}`}
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm opacity-60">
                        Scanning for account? <Link to="/register" className="text-primary font-bold hover:underline">Init registration</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
