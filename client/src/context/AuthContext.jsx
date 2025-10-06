import React, { createContext, useState, useContext } from 'react';
// 1. REMOVE the direct import of axios
// import axios from 'axios';

// 2. IMPORT our centralized API function instead
import { loginUser } from '../services/api';

// Create the Context
const AuthContext = createContext(null);

// Create the Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('userInfo');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            return null; // Handle potential JSON parsing errors
        }
    });

    // 3. REWRITE the login function to use our service
    const login = async (email, password) => {
        try {
            // Our api.js service handles the URL, method, and headers
            const { data } = await loginUser(email, password);
            
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            // The service will pass the error along, so we re-throw it
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy access
export const useAuth = () => {
    return useContext(AuthContext);
};