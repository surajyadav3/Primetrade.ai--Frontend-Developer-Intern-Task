import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { Plus, Search, Filter, LayoutGrid, List, CheckCircle2, Clock, Activity, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid');

    const [showAddForm, setShowAddForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
    const [isAdding, setIsAdding] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setNewTask({ title: '', description: '', status: 'pending' });
            setShowAddForm(false);
        } catch (err) {
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    };

    const updateTask = async (id, updatedData) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedData);
            setTasks(tasks.map(task => task._id === id ? res.data : task));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                task.description.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === 'all' || task.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [tasks, search, filter]);

    const stats = useMemo(() => {
        return {
            total: tasks.length,
            pending: tasks.filter(t => t.status === 'pending').length,
            progress: tasks.filter(t => t.status === 'in-progress').length,
            completed: tasks.filter(t => t.status === 'completed').length
        };
    }, [tasks]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight">System Monitor</h1>
                    <p className="text-base-content/50">Welcome back, <span className="text-primary font-bold">{user?.name}</span></p>
                </div>
                <button
                    className="btn btn-primary rounded-xl shadow-lg shadow-primary/20 gap-2 hover:scale-105 transition-transform"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    <Plus size={20} /> Deploy New Task
                </button>
            </header>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Logs', value: stats.total, icon: <Activity />, color: 'primary' },
                    { label: 'Standby', value: stats.pending, icon: <Clock />, color: 'warning' },
                    { label: 'Processing', value: stats.progress, icon: <Loader2 className="animate-spin" />, color: 'info' },
                    { label: 'Executed', value: stats.completed, icon: <CheckCircle2 />, color: 'success' }
                ].map((s, i) => (
                    <div key={i} className="card bg-base-200 shadow-xl border border-white/5 overflow-hidden group">
                        <div className="card-body p-4 md:p-6 flex-row items-center gap-4">
                            <div className={`p-3 rounded-xl bg-${s.color}/10 text-${s.color} group-hover:scale-110 transition-transform`}>
                                {s.icon}
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest opacity-50 font-bold">{s.label}</p>
                                <h3 className="text-2xl font-black">{s.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="card bg-base-200 border border-primary/20 shadow-2xl">
                            <div className="card-body">
                                <h3 className="text-xl font-bold mb-4">Initialize Task Parameters</h3>
                                <form onSubmit={addTask} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            className="input input-bordered rounded-xl bg-base-300/50 border-white/5 focus:input-primary"
                                            placeholder="Task Identifier"
                                            value={newTask.title}
                                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                            required
                                        />
                                        <select
                                            className="select select-bordered rounded-xl bg-base-300/50 border-white/5"
                                            value={newTask.status}
                                            onChange={e => setNewTask({ ...newTask, status: e.target.value })}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <textarea
                                            className="textarea textarea-bordered md:col-span-2 rounded-xl bg-base-300/50 border-white/5 focus:textarea-primary min-h-[100px]"
                                            placeholder="Payload Description"
                                            value={newTask.description}
                                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="card-actions justify-end mt-4">
                                        <button type="button" className="btn btn-ghost rounded-xl" onClick={() => setShowAddForm(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary px-8 rounded-xl" disabled={isAdding}>
                                            {isAdding ? <Loader2 className="animate-spin" /> : 'Deploy'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-200/50 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                    <input
                        className="input input-bordered w-full pl-12 rounded-xl bg-base-300/50 border-white/5 focus:input-primary transition-all"
                        placeholder="Search Registry..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="join w-full md:w-auto">
                        <select
                            className="select select-bordered join-item rounded-l-xl bg-base-300/50 border-white/5 focus:outline-none"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        >
                            <option value="all">Global</option>
                            <option value="pending">Standby</option>
                            <option value="in-progress">Processing</option>
                            <option value="completed">Executed</option>
                        </select>
                        <div className="join-item bg-base-300/50 flex items-center px-4 border border-l-0 border-white/5">
                            <Filter className="opacity-30" size={18} />
                        </div>
                    </div>
                    <div className="flex gap-1 bg-base-300/50 p-1 rounded-xl">
                        <button
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'hover:bg-white/10'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-content shadow-lg shadow-primary/20' : 'hover:bg-white/10'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid/List View */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary" size={48} />
                    <p className="text-primary font-bold tracking-widest animate-pulse">SYNCING DATA...</p>
                </div>
            ) : (
                <motion.div
                    layout
                    className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <motion.div
                                    key={task._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TaskCard task={task} onUpdate={updateTask} onDelete={deleteTask} viewMode={viewMode} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center bg-base-200 rounded-3xl border-2 border-dashed border-white/5"
                            >
                                <Activity className="mx-auto mb-4 opacity-10" size={64} />
                                <h3 className="text-xl font-bold opacity-30 uppercase tracking-[0.2em]">No Logs Found</h3>
                                <p className="text-base-content/30">Registry remains empty for current parameters.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
};

export default Dashboard;
