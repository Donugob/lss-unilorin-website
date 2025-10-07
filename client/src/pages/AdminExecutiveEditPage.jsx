import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getExecutiveById, createExecutive, updateExecutive, uploadFile } from '../services/api';
import './Admin.css';

const AdminExecutiveEditPage = () => {
    const { id: execId } = useParams();
    const navigate = useNavigate();

    // Form state
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [displayOrder, setDisplayOrder] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    
    // Helper state
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(!!execId);

    useEffect(() => {
        if (execId) {
            const fetchExecutive = async () => {
                try {
                    const { data } = await getExecutiveById(execId);
                    setName(data.name);
                    setPosition(data.position);
                    setImageUrl(data.imageUrl || '');
                    setDisplayOrder(data.displayOrder || 0);
                    setIsFeatured(data.isFeatured || false);
                } catch (error) {
                    toast.error('Could not fetch executive data.');
                } finally {
                    setPageLoading(false);
                }
            };
            fetchExecutive();
        }
    }, [execId]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await uploadFile(formData);
            setImageUrl(data.imageUrl);
            toast.success('Image uploaded successfully!');
        } catch (error) {
            toast.error('Image upload failed.');
        } finally {
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const execData = { name, position, imageUrl, displayOrder, isFeatured };
            if (execId) {
                await updateExecutive(execId, execData);
                toast.success('Executive profile updated successfully');
            } else {
                await createExecutive(execData);
                toast.success('Executive profile created successfully');
            }
            navigate('/admin/executives');
        } catch (error) {
            toast.error('Failed to save profile.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="container admin-container"><h1>Loading Profile...</h1></div>;

    return (
        <div className="container admin-container">
            <h1>{execId ? 'Edit Executive Profile' : 'Add New Executive'}</h1>
            <form onSubmit={submitHandler} className="admin-form">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position / Title</label>
                    <input id="position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="image-file">Profile Image</label>
                    <input type="text" placeholder="Upload an image to get a URL" value={imageUrl} readOnly style={{ marginBottom: '10px' }}/>
                    <input type="file" id="image-file" onChange={uploadFileHandler} />
                    {uploading && <p>Uploading, please wait...</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="displayOrder">Display Order (e.g., 1 for President)</label>
                    <input id="displayOrder" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} required />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} style={{width: 'auto'}} />
                    <label htmlFor="isFeatured" style={{ marginBottom: 0, fontWeight: 'normal' }}>Feature this Executive on the Homepage (sets them as President)?</label>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
                    {loading ? 'Saving...' : (execId ? 'Update Profile' : 'Create Profile')}
                </button>
            </form>
        </div>
    );
};

export default AdminExecutiveEditPage;