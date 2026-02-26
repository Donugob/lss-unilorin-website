import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedPosts } from '../services/api';
import { toast } from 'react-toastify';
import './NewsPage.css'; // We'll create this
import SEO from '../components/SEO';

const NewsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await getPublishedPosts();
                setPosts(data);
            } catch (error) {
                toast.error('Could not fetch posts.');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <div className="container" style={{ padding: '4rem 0' }}><h1>Loading articles...</h1></div>;

    return (
        <div className="container page-container">
            <SEO
                title="News & Publications"
                description="Read the latest news, articles, and publications from the Law Students' Society, University of Ilorin."
            />
            <h1 className="page-title">News & Publications</h1>
            {posts.length === 0 ? (
                <p>No articles have been published yet. Please check back soon.</p>
            ) : (
                <div className="post-grid">
                    {posts.map(post => (
                        <div key={post._id} className="post-card">
                            <Link to={`/news/${post.slug}`}>
                                <img src={post.coverImageUrl} alt={post.title} className="post-card-image" />
                            </Link>
                            <div className="post-card-content">
                                <h2 className="post-card-title">
                                    <Link to={`/news/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <p className="post-card-meta">
                                    By {post.author.fullName} on {new Date(post.publishedAt).toLocaleDateString()}
                                </p>
                                <Link to={`/news/${post.slug}`} className="btn btn-outline">Read More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsPage;