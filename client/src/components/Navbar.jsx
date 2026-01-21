import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar bg-base-100/50 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 border-b border-white/5">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                        <span className="text-primary-content font-black text-xl">P</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">PrimeTrade</span>
                </Link>
            </div>
            <div className="flex-none gap-2">
                {isAuthenticated ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                            <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                                <span className="text-xs">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-base-200 rounded-box w-52 border border-white/5">
                            <li className="menu-title px-4 py-2 opacity-50">Account</li>
                            <li>
                                <div className="flex flex-col items-start px-4 py-2 gap-0">
                                    <span className="font-bold">{user?.name}</span>
                                    <span className="text-xs opacity-50">{user?.email}</span>
                                </div>
                            </li>
                            <div className="divider my-0"></div>
                            <li><Link to="/dashboard"><LayoutDashboard size={16} /> Dashboard</Link></li>
                            <li><button onClick={handleLogout} className="text-error"><LogOut size={16} /> Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost btn-sm rounded-lg">Login</Link>
                        <Link to="/register" className="btn btn-primary btn-sm rounded-lg shadow-lg shadow-primary/20">Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
