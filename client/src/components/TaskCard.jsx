import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle, Clock, Loader } from 'lucide-react';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description);
    const [editStatus, setEditStatus] = useState(task.status);

    const handleUpdate = () => {
        onUpdate(task._id, { title: editTitle, description: editDesc, status: editStatus });
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'var(--success-color)';
            case 'in-progress': return 'var(--primary-color)';
            default: return 'var(--text-muted)';
        }
    };

    const StatusIcon = () => {
        switch (task.status) {
            case 'completed': return <CheckCircle size={16} color={getStatusColor('completed')} />;
            case 'in-progress': return <Loader size={16} color={getStatusColor('in-progress')} />;
            default: return <Clock size={16} color={getStatusColor('pending')} />;
        }
    };

    if (isEditing) {
        return (
            <div className="card" style={{ marginBottom: '1rem' }}>
                <input
                    className="input"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
                />
                <textarea
                    className="input"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    style={{ marginBottom: '0.5rem', minHeight: '60px', fontFamily: 'inherit' }}
                />
                <select
                    className="input"
                    value={editStatus}
                    onChange={e => setEditStatus(e.target.value)}
                    style={{ marginBottom: '1rem' }}
                >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" onClick={handleUpdate} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Save</button>
                    <button className="btn btn-outline" onClick={() => setIsEditing(false)} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className="card fade-in" style={{ marginBottom: '1rem', borderLeft: `4px solid ${getStatusColor(task.status)}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {task.title}
                        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', color: getStatusColor(task.status), border: `1px solid ${getStatusColor(task.status)}` }}>
                            {task.status}
                        </span>
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{task.description}</p>
                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={12} /> Created: {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Pencil size={18} />
                    </button>
                    <button onClick={() => onDelete(task._id)} style={{ background: 'none', border: 'none', color: 'var(--error-color)', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
