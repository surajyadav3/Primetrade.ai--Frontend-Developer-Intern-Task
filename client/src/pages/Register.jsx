import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const { register, error, setError } = useAuth();
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setSubmitting(true);
        try {
            await register({ name, email, password });
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card w-full max-w-lg bg-base-200 shadow-2xl border border-white/5"
            >
                <div className="card-body">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">Create Identity</h2>
                        <p className="text-base-content/60 mt-2">Join the next generation of trading</p>
                    </div>

                    {error && (
                        <div className="alert alert-error shadow-lg mb-6 py-2 px-4 rounded-xl text-sm">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-semibold uppercase text-[10px] tracking-widest opacity-50">Full Name</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    className="input input-bordered w-full pl-12 rounded-xl focus:input-primary transition-all bg-base-300/50 border-white/5"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control md:col-span-2">
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
                            <label className="label">
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
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold uppercase text-[10px] tracking-widest opacity-50">Confirm</span>
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={onChange}
                                    className="input input-bordered w-full pl-12 rounded-xl focus:input-primary transition-all bg-base-300/50 border-white/5"
                                    placeholder="••••••••"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full md:col-span-2 rounded-xl transition-all shadow-lg shadow-primary/20 mt-4 h-12 uppercase tracking-widest text-xs ${submitting ? 'btn-disabled' : ''}`}
                        >
                            {submitting ? <Loader2 className="animate-spin" /> : <>Initialize Account <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm opacity-60">
                        Known status? <Link to="/login" className="text-primary font-bold hover:underline">Access terminal</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
