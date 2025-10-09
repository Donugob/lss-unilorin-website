import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

// --- Interceptor to add the Auth Token to every request ---
api.interceptors.request.use((config) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
    } catch (error) {
        console.error("Could not parse user info from localStorage", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// --- Global ---
export const uploadFile = (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const sendContactMessage = (formData) => api.post('/contact', formData);
export const getDashboardStats = () => api.get('/dashboard/stats');


// --- User / Auth ---
export const loginUser = (email, password) => api.post('/users/login', { email, password });
export const registerUser = (userData) => api.post('/users/register', userData);


// --- Events ---
export const getAllEvents = () => api.get('/events');
export const getFeaturedEvent = () => api.get('/events/featured');
export const getEventById = (id) => api.get(`/events/${id}`);
export const createEvent = (eventData) => api.post('/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/events/${id}`);


// --- Posts ---
export const getPublishedPosts = () => api.get('/posts');
export const getPostBySlug = (slug) => api.get(`/posts/${slug}`);
export const getAllPostsAdmin = () => api.get('/posts/all');
export const getPostByIdAdmin = (id) => api.get(`/posts/admin/${id}`);
export const createPost = (postData) => api.post('/posts', postData);
export const updatePost = (id, postData) => api.put(`/posts/${id}`, postData);
export const deletePost = (id) => api.delete(`/posts/${id}`);


// --- Executives ---
export const getExecutives = () => api.get('/executives');
export const getFeaturedExecutive = () => api.get('/executives/featured');
export const getExecutiveById = (id) => api.get(`/executives/${id}`);
export const createExecutive = (execData) => api.post('/executives', execData);
export const updateExecutive = (id, execData) => api.put(`/executives/${id}`, execData);
export const deleteExecutive = (id) => api.delete(`/executives/${id}`);


// --- Materials ---
// --- THIS IS THE NEW FUNCTION THAT WAS MISSING ---
export const getPublicMaterials = (params) => api.get('/materials', { params });

export const getAllMaterialsAdmin = () => api.get('/materials/all');
export const getMaterialById = (id) => api.get(`/materials/${id}`);
export const createMaterial = (materialData) => api.post('/materials', materialData);
export const updateMaterial = (id, materialData) => api.put(`/materials/${id}`, materialData);
export const deleteMaterial = (id) => api.delete(`/materials/${id}`);


export default api;