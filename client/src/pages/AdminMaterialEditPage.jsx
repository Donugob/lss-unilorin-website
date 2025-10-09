import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getMaterialById, createMaterial, updateMaterial, uploadFile } from '../services/api';
import './Admin.css';

const AdminMaterialEditPage = () => {
    const { id: materialId } = useParams();
    const navigate = useNavigate();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState('100L');
    const [materialType, setMaterialType] = useState('Lecture Note');
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('');
    
    // Helper state
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(!!materialId);

    // --- FULLY IMPLEMENTED useEffect to fetch data for editing ---
    useEffect(() => {
        if (materialId) {
            const fetchMaterial = async () => {
                try {
                    const { data } = await getMaterialById(materialId);
                    setTitle(data.title);
                    setDescription(data.description || '');
                    setLevel(data.level);
                    setMaterialType(data.materialType);
                    setFileUrl(data.fileUrl || '');
                    setFileType(data.fileType || '');
                } catch (error) {
                    toast.error("Could not fetch material data.");
                    navigate('/admin/materials'); // Redirect if material not found
                } finally {
                    setPageLoading(false);
                }
            };
            fetchMaterial();
        }
    }, [materialId, navigate]);

    // --- FULLY IMPLEMENTED upload handler ---
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file); // Backend expects 'image' key
        
        setUploading(true);
        try {
            const { data } = await uploadFile(formData);
            setFileUrl(data.imageUrl);
            
            const extension = file.name.split('.').pop().toUpperCase();
            if (['PDF', 'DOC', 'DOCX'].includes(extension)) {
                setFileType(extension);
            } else if (['JPG', 'JPEG', 'PNG', 'GIF'].includes(extension)) {
                setFileType('Image');
            } else {
                setFileType('File');
            }
            toast.success('File uploaded successfully!');
        } catch (error) {
            toast.error('File upload failed.');
        } finally {
            setUploading(false);
        }
    };

    // --- FULLY IMPLEMENTED submit handler ---
    const submitHandler = async (e) => {
        e.preventDefault();
        if (!fileUrl) {
            toast.error('Please upload a file first.');
            return;
        }
        setLoading(true);
        try {
            const materialData = { title, description, level, materialType, fileUrl, fileType };
            if (materialId) {
                await updateMaterial(materialId, materialData);
                toast.success('Material updated successfully');
            } else {
                await createMaterial(materialData);
                toast.success('Material created successfully');
            }
            navigate('/admin/materials');
        } catch (error) {
            toast.error('Failed to save material.');
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) return <div className="container admin-container"><h1>Loading Material...</h1></div>;

    return (
        <div className="container admin-container">
            <h1>{materialId ? 'Edit Material' : 'Add New Material'}</h1>
            <form onSubmit={submitHandler} className="admin-form">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description (Optional)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" style={{width: '100%', padding: '10px', fontFamily: 'var(--font-body)', fontSize: '1rem'}}/>
                </div>
                <div className="form-group">
                    <label>Level</label>
                    <select value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="100L">100L</option>
                        <option value="200L">200L</option>
                        <option value="300L">300L</option>
                        <option value="400L">400L</option>
                        <option value="500L">500L</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Type of Material</label>
                    <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
                        <option value="Lecture Note">Lecture Note</option>
                        <option value="Past Question">Past Question</option>
                        <option value="Handout">Handout</option>
                        <option value="Textbook">Textbook</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Upload File (PDF, DOC, PNG, JPG)</label>
                    <input type="text" value={fileUrl} placeholder="Upload a file to get its URL" readOnly style={{ marginBottom: '10px' }}/>
                    <input type="file" onChange={uploadFileHandler} />
                    {uploading && <p>Uploading...</p>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading || uploading}>
                    {loading ? 'Saving...' : (materialId ? 'Update Material' : 'Create Material')}
                </button>
            </form>
        </div>
    );
};

export default AdminMaterialEditPage;