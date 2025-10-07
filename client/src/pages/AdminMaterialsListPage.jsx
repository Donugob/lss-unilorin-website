import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllMaterialsAdmin, deleteMaterial } from '../services/api';
import './Admin.css';

const AdminMaterialsListPage = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fully implemented fetch logic
    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const { data } = await getAllMaterialsAdmin();
            setMaterials(data);
        } catch (error) {
            toast.error('Failed to fetch materials.');
            console.error("Fetch materials error:", error);
        } finally {
            setLoading(false);
        }
    };

    // This runs once when the component first mounts
    useEffect(() => {
        fetchMaterials();
    }, []);

    // 2. Fully implemented delete logic
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            try {
                await deleteMaterial(id);
                toast.success('Material deleted successfully');
                // Refetch the materials list to reflect the deletion
                fetchMaterials();
            } catch (error) {
                toast.error('Failed to delete material.');
                console.error("Delete material error:", error);
            }
        }
    };
    
    // Handler to navigate to the creation page
    const createMaterialHandler = () => {
        navigate('/admin/material/new');
    };

    if (loading) return <div className="container admin-container"><h1>Loading Materials...</h1></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h1>Manage Materials</h1>
                <button onClick={createMaterialHandler} className="btn btn-primary">Add New Material</button>
            </div>
            
            {materials.length === 0 ? (
                <p>No materials found. Click "Add New Material" to get started.</p>
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>TITLE</th>
                            <th>LEVEL</th>
                            <th>TYPE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map(material => (
                            <tr key={material._id}>
                                {/* 3. Added data-label for mobile responsiveness */}
                                <td data-label="Title">{material.title}</td>
                                <td data-label="Level">{material.level}</td>
                                <td data-label="Type">{material.materialType}</td>
                                <td data-label="Actions">
                                    {/* 4. Fully implemented Edit and Delete buttons */}
                                    <Link to={`/admin/material/${material._id}/edit`} className="btn btn-outline" style={{ marginRight: '10px' }}>Edit</Link>
                                    <button onClick={() => deleteHandler(material._id)} className="btn btn-secondary">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminMaterialsListPage;