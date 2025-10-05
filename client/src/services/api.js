import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// --- Interceptor to add the Auth Token to every request ---
// This is a powerful Axios feature. It runs before every request is sent.
api.interceptors.request.use((config) => {
    // Get user info from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.token) {
        // If the token exists, add it to the Authorization header
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export const uploadImage = (formData) => api.post('/upload', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// --- EVENT API CALLS ---
export const getFeaturedEvent = () => api.get('/events/featured');
export const getAllEvents = () => api.get('/events');
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
export const getPublishedPosts = () => api.get('/posts');
export const getPostBySlug = (slug) => api.get(`/posts/${slug}`);
export const sendContactMessage = (formData) => api.post('/contact', formData);

// --- USER API CALLS (We can move these here too for consistency) ---
export const loginUser = (email, password) => api.post('/users/login', { email, password });
export const registerUser = (userData) => api.post('/users/register', userData);

export const getAllPostsAdmin = () => api.get('/posts/all');
export const getPostByIdAdmin = (id) => api.get(`/posts/admin/${id}`); // We need a way to get a single post by ID for editing
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getDashboardStats = () => api.get('/dashboard/stats');

export const getFeaturedExecutive = () => api.get('/executives/featured');
export const getExecutives = () => api.get('/executives');
export const createExecutive = (execData) => api.post('/executives', execData);
export const updateExecutive = (id, execData) => api.put(`/executives/${id}`, execData);
export const deleteExecutive = (id) => api.delete(`/executives/${id}`);
export const getExecutiveById = (id) => api.get(`/executives/${id}`);

export default api;