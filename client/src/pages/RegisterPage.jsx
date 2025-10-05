import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // 1. Add loading state
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (loading) return; // Prevent submission if already loading

        setLoading(true); // 2. Set loading to true
        try {
            await axios.post('http://localhost:5001/api/users/register', { fullName, email, password });
            toast.success('Registration Successful! Please log in.');
            navigate('/login');
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed.';
            toast.error(message);
        } finally {
            setLoading(false); // 3. Set loading to false in all cases
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Register Admin</h1>
                <form onSubmit={submitHandler}>
                    {/* ... form inputs remain the same ... */}
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
                    {/* 4. Disable button and change text when loading */}
                    <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;