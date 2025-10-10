import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import lssLogo from '../assets/lss-logo.png';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const logoutHandler = () => {
        closeMenu();
        logout();
        navigate('/admin/login');
    };

    return (
        <>
            <header className="site-header">
                <div className="container header-container">
                    {/* --- THE NEW COMBINED LOGO --- */}
                    <Link to="/" className="logo" onClick={closeMenu}>
                        <img src={lssLogo} alt="LSS UNILORIN Crest" />
                        <div className="logo-text">
                            <span>Law Students' Society</span>
                            <span>University of Ilorin</span>
                        </div>
                    </Link>
                    {/* --- END OF LOGO --- */}

                    <nav className="main-nav desktop-nav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/events">Events</NavLink>
                        <NavLink to="/news">News & Publications</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        <NavLink to="/materials">Materials</NavLink>
                        <NavLink to="/podcast">Law & Vibes Podcast</NavLink>
                    </nav>
                </div>
            </header>

            <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
                <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                    >
                        <nav className="mobile-nav-links">
                            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                            <NavLink to="/events" onClick={closeMenu}>Events</NavLink>
                            <NavLink to="/news" onClick={closeMenu}>News & Publications</NavLink>
                            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
                            <NavLink to="/materials" onClick={closeMenu}>Materials</NavLink>
                            <NavLink to="/podcast" onClick={closeMenu}>Law & Vibes Podcast</NavLink>
                        </nav>
                        {user && (
                           <div className="mobile-user-section">
                             <span className="user-greeting">Welcome, {user.fullName.split(' ')[0]}</span>
                             <button onClick={logoutHandler} className="logout-button">Logout</button>
                           </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;