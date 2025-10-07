import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPostByIdAdmin, createPost, updatePost, uploadFile } from '../services/api';
import { Editor } from '@tinymce/tinymce-react'; // 1. Import the TinyMCE Editor
import './Admin.css';

const AdminPostEditPage = () => {
    const { id: postId } = useParams();
    const navigate = useNavigate();

    // --- State remains the same ---
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [contentBody, setContentBody] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [status, setStatus] = useState('draft');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(!!postId);

    // --- All handler functions (useEffect, upload, submit, etc.) remain the same ---
    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                try {
                    const { data } = await getPostByIdAdmin(postId);
                    setTitle(data.title);
                    setSlug(data.slug);
                    setContentBody(data.contentBody);
                    setCoverImageUrl(data.coverImageUrl || '');
                    setStatus(data.status);
                } catch (error) { toast.error('Could not fetch post data.'); }
                finally { setPageLoading(false); }
            };
            fetchPost();
        }
    }, [postId]);

    const uploadFileHandler = async (e) => {
        // ... (this function is unchanged)
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await uploadFile(formData);
            setCoverImageUrl(data.imageUrl);
            toast.success('Image uploaded!');
        } catch (error) { toast.error('Image upload failed.'); }
        finally { setUploading(false); }
    };
    
    const submitHandler = async (e) => {
        // ... (this function is unchanged)
        e.preventDefault();
        setLoading(true);
        try {
            const postData = { title, slug, contentBody, coverImageUrl, status };
            if (postId) {
                await updatePost(postId, postData);
                toast.success('Post updated successfully');
            } else {
                await createPost(postData);
                toast.success('Post created successfully');
            }
            navigate('/admin/posts');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to save post.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleTitleChange = (e) => {
        // ... (this function is unchanged)
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!postId) {
            const newSlug = newTitle.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            setSlug(newSlug);
        }
    }

    if (pageLoading) return <div className="container admin-container"><h1>Loading Post...</h1></div>;

    return (
        <div className="container admin-container">
            <h1>{postId ? 'Edit Post' : 'Create New Post'}</h1>
            <form onSubmit={submitHandler} className="admin-form">
                {/* ... Title and Slug fields are the same ... */}
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="slug">Slug (URL-friendly version)</label>
                    <input id="slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>

                {/* --- 2. Replace the old editor with the TinyMCE Editor component --- */}
                <div className="form-group">
                    <label>Content</label>
                    <Editor
                        apiKey='0ky5j4ozaqtsmxwjven8srmepr2rg959impsx0er0psx5d1b' // <-- PASTE YOUR API KEY HERE
                        value={contentBody}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:var(--font-body); font-size:16px }'
                        }}
                        onEditorChange={(content) => setContentBody(content)}
                    />
                </div>

                {/* ... (The rest of the form is the same) ... */}
                <div className="form-group">
                    <label htmlFor="image-file">Cover Image</label>
                    <input type="text" placeholder="Upload an image to get a URL" value={coverImageUrl} readOnly style={{ marginBottom: '10px' }}/>
                    <input type="file" id="image-file" onChange={uploadFileHandler} />
                    {uploading && <p>Uploading, please wait...</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
                    {loading ? 'Saving...' : (postId ? 'Update Post' : 'Create Post')}
                </button>
            </form>
        </div>
    );
};

export default AdminPostEditPage;