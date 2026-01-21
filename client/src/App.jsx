import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

// Simple Landing
const Landing = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight pb-2">
        Master Your Productivity <br className="hidden md:block" /> with PrimeTrade
      </h1>
      <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-10 leading-relaxed">
        A high-performance task management dashboard designed for the modern developer.
        Secure, lightning-fast, and stunningly beautiful.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mb-20">
        <Link to="/register" className="btn btn-primary btn-lg px-12 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-outline btn-lg px-12 rounded-full hover:bg-base-content hover:text-base-100 transition-colors">
          Sign In
        </Link>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
      {[
        { title: "🚀 Fast & Secure", desc: "Built with Node.js and React for top-tier performance and reliability.", icon: "⚡" },
        { title: "🔒 Encrypted", desc: "Your data is protected with industry-standard hashing and secure JWT.", icon: "🛡️" },
        { title: "✨ Modern UI", desc: "Crafted with DaisyUI and Tailwind for a sleek, responsive experience.", icon: "🎨" }
      ].map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
          className="card bg-base-200 shadow-xl border border-white/5 hover:border-primary/30 transition-colors group"
        >
          <div className="card-body items-center text-center">
            <span className="text-4xl mb-4 group-hover:scale-125 transition-transform">{feature.icon}</span>
            <h3 className="card-title text-2xl font-bold">{feature.title}</h3>
            <p className="text-base-content/60">{feature.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

function App() {
  return (
    <div data-theme="night" className="min-h-screen bg-base-300 font-sans">
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
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
          </main>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
