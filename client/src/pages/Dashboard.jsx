import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // New Task State
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });

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
        try {
            const res = await axios.post('http://localhost:5000/api/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setNewTask({ title: '', description: '', status: 'pending' });
            setShowAddForm(false);
        } catch (err) {
            console.error(err);
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
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="container" style={{ padding: '2rem 20px' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user && user.name}</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
                    <Plus size={18} /> New Task
                </button>
            </header>

            {/* Add Task Form with Animation */}
            {showAddForm && (
                <div className="card fade-in" style={{ marginBottom: '2rem', border: '1px solid var(--primary-color)' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Create New Task</h3>
                    <form onSubmit={addTask}>
                        <input
                            className="input"
                            placeholder="Task Title"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                            style={{ marginBottom: '1rem' }}
                        />
                        <textarea
                            className="input"
                            placeholder="Description"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            style={{ marginBottom: '1rem', minHeight: '80px', fontFamily: 'inherit' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Add Task</button>
                            <button type="button" className="btn btn-outline" onClick={() => setShowAddForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div className="input-group" style={{ marginBottom: 0, flex: 1, minWidth: '250px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            className="input"
                            placeholder="Search tasks..."
                            style={{ paddingLeft: '40px' }}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="input-group" style={{ marginBottom: 0, minWidth: '200px' }}>
                    <div style={{ position: 'relative' }}>
                        <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select
                            className="input"
                            style={{ paddingLeft: '40px' }}
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading tasks...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                            <TaskCard key={task._id} task={task} onUpdate={updateTask} onDelete={deleteTask} />
                        ))
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius)' }}>
                            <p>No tasks found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
