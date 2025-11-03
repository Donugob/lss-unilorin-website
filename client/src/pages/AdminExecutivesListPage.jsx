import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getExecutives, deleteExecutive } from '../services/api';
import './Admin.css';

const AdminExecutivesListPage = () => {
    const [executives, setExecutives] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchExecutives = async () => {
        setLoading(true);
        try {
            const { data } = await getExecutives();
            setExecutives(data);
        } catch (error) {
            toast.error('Failed to fetch executive profiles.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExecutives();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this profile?')) {
            try {
                await deleteExecutive(id);
                toast.success('Executive profile deleted successfully');
                fetchExecutives(); // Refetch the list
            } catch (error) {
                toast.error('Failed to delete profile.');
            }
        }
    };

    const createHandler = () => {
        navigate('/admin/executive/new');
    };

    if (loading) return <div className="container admin-container"><h1>Loading Executive Profiles...</h1></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h1>Manage Executives</h1>
                <button onClick={createHandler} className="btn btn-primary">Add New Executive</button>
            </div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>POSITION</th>
                        <th>DISPLAY ORDER</th>
                        <th>FEATURED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {executives.map(exec => (
                        <tr key={exec._id}>
                            <td>{exec.name}</td>
                            <td>{exec.position}</td>
                            <td>{exec.displayOrder}</td>
                            <td>{exec.isFeatured ? 'Yes' : 'No'}</td>
                            <td>
                                <Link to={`/admin/executive/${exec._id}/edit`} className="btn btn-outline" style={{ marginRight: '10px' }}>Edit</Link>
                                <button onClick={() => deleteHandler(exec._id)} className="btn btn-secondary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminExecutivesListPage;