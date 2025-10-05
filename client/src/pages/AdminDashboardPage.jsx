import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats } from '../services/api';
import { FiCalendar, FiFileText, FiUsers, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './AdminDashboard.css'; // We will create a new, dedicated CSS file

const StatCard = ({ icon, title, value, loading }) => (
    <div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <span className="stat-title">{title}</span>
            <span className="stat-value">{loading ? '...' : value}</span>
        </div>
    </div>
);

const ManagementCard = ({ icon, title, description, viewLink, createLink }) => (
    <motion.div className="management-card" whileHover={{ y: -5 }}>
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="card-actions">
            <Link to={viewLink} className="btn btn-outline">View List</Link>
            <Link to={createLink} className="btn btn-primary"><FiPlus /> Create New</Link>
        </div>
    </motion.div>
);

const AdminDashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="container">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                    <p className="dashboard-welcome">Welcome back, {user.fullName}! Here's a snapshot of your website.</p>
                </motion.div>

                {/* --- Stat Cards --- */}
                <div className="stats-grid">
                    <StatCard icon={<FiCalendar />} title="Total Events" value={stats?.events} loading={loading} />
                    <StatCard icon={<FiFileText />} title="Published Posts" value={stats?.posts} loading={loading} />
                    <StatCard icon={<FiUsers />} title="Executive Profiles" value={stats?.executives} loading={loading} />
                </div>

                {/* --- Management Cards --- */}
                <div className="management-grid">
                    <ManagementCard 
                        icon={<FiCalendar />}
                        title="Events Management"
                        description="Create, update, and manage all society events and schedules."
                        viewLink="/admin/events"
                        createLink="/admin/event/new"
                    />
                    <ManagementCard 
                        icon={<FiFileText />}
                        title="Posts Management"
                        description="Write, publish, and manage all news, announcements, and articles."
                        viewLink="/admin/posts"
                        createLink="/admin/post/new"
                    />
                    <ManagementCard 
                        icon={<FiUsers />}
                        title="Executives Management"
                        description="Update the profiles and roles of the LSS executive council."
                        viewLink="/admin/executives"
                        createLink="/admin/executive/new"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;