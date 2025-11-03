import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllPostsAdmin, deletePost } from '../services/api'; // 1. Import real API functions
import './Admin.css';

const AdminPostsListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 2. Create a reusable fetch function
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data } = await getAllPostsAdmin();
            setPosts(data);
        } catch (error) {
            toast.error('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    // 3. Call fetch on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id); // 4. Call real delete API
                toast.success('Post deleted successfully');
                fetchPosts(); // 5. Refetch posts to update the list
            } catch (error) {
                toast.error('Failed to delete post.');
            }
        }
    };

    const createPostHandler = () => {
        navigate('/admin/post/new');
    };

    if (loading) return <div className="container admin-container"><h1>Loading Posts...</h1></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h1>Manage Posts</h1>
                <button onClick={createPostHandler} className="btn btn-primary">Create Post</button>
            </div>
            {posts.length === 0 ? (
                <p>No posts found. Click "Create Post" to add one.</p>
            ) : (
                <table className="admin-table">
                    {/* ... (table structure remains the same) ... */}
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>AUTHOR</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.author ? post.author.fullName : 'N/A'}</td>
                                <td>
                                    <span style={{ color: post.status === 'published' ? 'green' : 'orange', fontWeight: 'bold' }}>
                                        {post.status.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/admin/post/${post._id}/edit`} className="btn btn-outline" style={{ marginRight: '10px' }}>Edit</Link>
                                    <button onClick={() => deleteHandler(post._id)} className="btn btn-secondary">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPostsListPage;