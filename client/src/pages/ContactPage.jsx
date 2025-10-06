import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { sendContactMessage } from '../services/api';

// 1. Import the specific icons we need from react-icons/fi
import { FiMail, FiPhone, FiTwitter, FiLinkedin } from 'react-icons/fi'; 

import './ContactPage.css';

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const formData = { name, email, message };
            await sendContactMessage(formData);
            toast.success(`Thank you, ${name}! We've received your message.`);
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send message.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page-wrapper">
            <motion.div 
                className="contact-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {/* --- The "Info Pillar" --- */}
                <div className="contact-info-panel">
                    <h2>Let's Connect</h2>
                    <p>Whether you're a student, an alumnus, a prospective partner, or a member of the public, we're ready to listen.</p>

                    {/* 2. Replace emojis with the imported icon components */}
                    <div className="info-item">
                        <FiMail className="info-icon" />
                        <a href="mailto:lawstudentssocietyunilawrin@gmail.com">lawstudentssocietyunilawrin@gmail.com</a>
                    </div>
                    <div className="info-item">
                        <FiPhone className="info-icon" />
                        <a href="tel:+2348167517012">+234 816 751 7012</a>
                    </div>
                    <div className="social-media-links">
                        <a href="https://x.com/unilawrin_" target="_blank" rel="noopener noreferrer" className="social-button">
                            <FiTwitter />
                            <span>X</span>
                        </a>
                        <a href="https://www.linkedin.com/in/law-students-society-unilorin-9601411aa/" target="_blank" rel="noopener noreferrer" className="social-button">
                            <FiLinkedin />
                            <span>LinkedIn</span>
                        </a>
                    </div>
                </div>

                {/* --- The "Action Panel" --- */}
                <div className="contact-form-panel">
                    {/* ... (The form JSX remains exactly the same) ... */}
                    <form onSubmit={submitHandler}>
                        <div className="form-group floating">
                            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder=" " />
                            <label htmlFor="name">Full Name</label>
                        </div>
                        <div className="form-group floating">
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="form-group floating">
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows="6" placeholder=" " />
                            <label htmlFor="message">Your Message</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;