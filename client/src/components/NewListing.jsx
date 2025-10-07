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
        category: '',
        imageUrl : '',
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

    const handleSubmit = async() => {
        console.log('Form submitted:', formData);
        alert('Listing created successfully!');
        const token = localStorage.getItem("token");
        const data = await fetch("http://localhost:5000/" , {
            method: "POST",
            headers : {
                "Content-Type" :"application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                title : formData.title,
                description : formData.description,
                imageUrl : formData.imageUrl || "https://plus.unsplash.com/premium_photo-1759139844630-6450c6c01d73?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                country : formData.country,
                price : parseInt(formData.price),
                location : formData.location,
                tag : formData.category,
            })
        })
        const response = await data.json();
        if(response)navigate('/');
        
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
                    required
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
                    required
                    />
                </div>

                <div className="form-group">
                    <label >Image Url</label>
                    <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-1464822759023-..."
                    required
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
                        required
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
                    required
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
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
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
