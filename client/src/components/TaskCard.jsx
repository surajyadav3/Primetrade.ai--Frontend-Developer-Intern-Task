import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle, Clock, Loader2, Save, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onUpdate, onDelete, viewMode }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title: task.title,
        description: task.description,
        status: task.status
    });

    const handleUpdate = () => {
        onUpdate(task._id, editData);
        setIsEditing(false);
    };

    const statusConfig = {
        'completed': { color: 'success', icon: <CheckCircle size={14} />, label: 'Executed' },
        'in-progress': { color: 'info', icon: <Loader2 size={14} className="animate-spin" />, label: 'Active' },
        'pending': { color: 'warning', icon: <Clock size={14} />, label: 'Standby' }
    };

    const config = statusConfig[task.status] || statusConfig['pending'];

    if (isEditing) {
        return (
            <div className="card bg-base-200 border-2 border-primary/50 shadow-2xl p-4 space-y-3">
                <input
                    className="input input-sm input-bordered w-full rounded-lg bg-base-300"
                    value={editData.title}
                    onChange={e => setEditData({ ...editData, title: e.target.value })}
                />
                <textarea
                    className="textarea textarea-sm textarea-bordered w-full rounded-lg bg-base-300"
                    value={editData.description}
                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                />
                <div className="flex justify-between items-center">
                    <select
                        className="select select-sm select-bordered rounded-lg"
                        value={editData.status}
                        onChange={e => setEditData({ ...editData, status: e.target.value })}
                    >
                        <option value="pending">Standby</option>
                        <option value="in-progress">Processing</option>
                        <option value="completed">Executed</option>
                    </select>
                    <div className="flex gap-2">
                        <button className="btn btn-primary btn-sm rounded-lg" onClick={handleUpdate}><Save size={16} /></button>
                        <button className="btn btn-ghost btn-sm rounded-lg" onClick={() => setIsEditing(false)}><X size={16} /></button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`group relative card bg-base-200 shadow-xl border border-white/5 hover:border-${config.color}/30 transition-all duration-500 hover:shadow-${config.color}/5 overflow-hidden`}>
            {/* Status Bar */}
            <div className={`absolute top-0 left-0 w-1 h-full bg-${config.color} opacity-40 group-hover:opacity-100 transition-opacity`} />

            <div className="card-body p-5">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <div className={`badge badge-${config.color} badge-sm rounded-md gap-1 py-3 px-3 uppercase text-[9px] font-black tracking-widest`}>
                            {config.icon} {config.label}
                        </div>
                        <h3 className="card-title text-lg font-bold leading-tight group-hover:text-primary transition-colors cursor-default">
                            {task.title}
                        </h3>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn btn-ghost btn-square btn-sm hover:bg-white/10"
                        >
                            <Pencil size={14} className="opacity-50" />
                        </button>
                        <button
                            onClick={() => onDelete(task._id)}
                            className="btn btn-ghost btn-square btn-sm hover:bg-error/20 hover:text-error"
                        >
                            <Trash2 size={14} className="opacity-50" />
                        </button>
                    </div>
                </div>

                <p className="text-sm text-base-content/60 leading-relaxed min-h-[40px] mt-2 italic line-clamp-2">
                    "{task.description || 'No payload data provided...'}"
                </p>

                <div className="card-actions justify-between items-center mt-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider opacity-30">
                        <Calendar size={12} />
                        {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    <div className="hidden group-hover:block animate-in fade-in slide-in-from-right-2">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">Access Log →</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
