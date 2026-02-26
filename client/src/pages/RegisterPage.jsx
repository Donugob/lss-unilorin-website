import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// 1. We no longer need to import axios directly
// import axios from 'axios'; 
import { registerUser } from '../services/api'; // <-- IMPORT the correct function
import './AuthPage.css';
import SEO from '../components/SEO';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            // 2. THE FIX: Replace the hardcoded axios.post with our API service function
            await registerUser({ fullName, email, password });

            toast.success('Registration Successful! Please log in.');

            // 3. UX IMPROVEMENT: Navigate to the correct admin login page
            navigate('/admin/login');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <SEO title="Admin Registration" description="Register to the dashboard" />
            <div className="auth-card">
                <h1>Register Admin</h1>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;