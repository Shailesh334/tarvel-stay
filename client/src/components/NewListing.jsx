import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const NewListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        country: '',
        location: '',
        category: ''
    });

    const categories = [
        'Beachfront',
        'Cabins',
        'Trending',
        'Countryside',
        'Amazing pools',
        'Islands',
        'Lakefront',
        'Design',
        'Caves',
        'Camping',
        'Castles',
        'Skiing',
        'Tiny homes'
    ];

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });

    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Listing created successfully!');
    };
    
    const { isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/login"); // redirect if not logged in
        }
     }, [isAuthenticated, navigate]);   

     if(!isAuthenticated)return null;
    return (
            <div className="container">
                <h1>Add New Listing</h1>
                <p className="subtitle">Fill in the details to create your listing</p>

                <div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Cozy Beach House"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your listing..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (per night)</label>
                    <div className="price-input">
                    <span className="price-symbol">₹</span>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="100"
                        min="0"
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g., United States"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Miami, Florida"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                </div>

                <button onClick={handleSubmit} className="submit-btn">
                    Create Listing
                </button>
                </div>
            </div>
    )
}

export default NewListing
