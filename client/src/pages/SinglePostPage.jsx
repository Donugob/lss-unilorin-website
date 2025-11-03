import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../services/api';
import { toast } from 'react-toastify';
import './SinglePostPage.css'; // We will replace the CSS

const SinglePostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            window.scrollTo(0, 0);
            try {
                const { data } = await getPostBySlug(slug);
                setPost(data);
            } catch (error) {
                toast.error('Could not find the requested post.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="page-loader"><h1>Loading Article...</h1></div>;
    if (!post) return <div className="container page-container"><h1>Post Not Found.</h1><Link to="/news">Back to News</Link></div>;

    return (
        <article className="single-post-page">
            {/* 1. Full-bleed header with background image */}
            <header className="post-header-full-bleed" style={{ backgroundImage: `url(${post.coverImageUrl})` }}>
                <div className="container">
                    <h1 className="post-title-hero">{post.title}</h1>
                    <div className="post-meta-hero">
                        <span>By {post.author.fullName}</span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </header>

            {/* 2. Constrained width for comfortable reading */}
            <div className="post-content-body">
                <div 
                    dangerouslySetInnerHTML={{ __html: post.contentBody }} 
                />
            </div>
        </article>
    );
};

export default SinglePostPage;