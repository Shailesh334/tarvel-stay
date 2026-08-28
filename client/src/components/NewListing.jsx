import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UploadCloud, Image as ImageIcon, Plus, ArrowLeft } from 'lucide-react';
import { API_URL } from '../api.js';

const NewListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        country: '',
        location: '',
        category: 'beach',
        imageUrl: '',
    });

    const categories = [
        { id: 'beach', name: 'Beachfront' },
        { id: 'mountains', name: 'Mountains' },
        { id: 'trending', name: 'Trending' },
        { id: 'topcities', name: 'Top Cities' },
        { id: 'countryside', name: 'Countryside' },
        { id: 'farms', name: 'Farms & Nature' },
        { id: 'artic', name: 'Arctic & Cabins' }
    ];

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to host a stay!");
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const handleImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setLoading(true);

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "stays_image_upload");
        data.append("cloud_name", "dvrrbqmuo");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dvrrbqmuo/image/upload", {
                method: "POST",
                body: data
            });
            const uploadImageUrl = await res.json();
            if (uploadImageUrl.secure_url) {
                setImageUrl(uploadImageUrl.secure_url);
                toast.success("Image uploaded successfully!");
            }
        } catch (err) {
            console.error("Image upload failed:", err);
            toast.error("Failed to upload image. You can also paste an image URL.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description, country, price, location, category } = formData;
        if (!title || !description || !country || !price || !location || !category) {
            toast.error("Please fill in all required details");
            return;
        }

        const finalImageUrl = imageUrl || formData.imageUrl || "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60";

        const token = localStorage.getItem("token");
        try {
            const data = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    imageUrl: finalImageUrl,
                    country: formData.country,
                    price: parseInt(formData.price),
                    location: formData.location,
                    tag: formData.category,
                })
            });

            if (data.status === 400) {
                toast.error("Invalid request parameters");
                return;
            }
            const response = await data.json();
            if (response) {
                toast.success("Listing created successfully!");
                navigate('/');
            }
        } catch (err) {
            console.error("Create listing error:", err);
            toast.error("Failed to create listing");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="form-page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
                <span>Cancel</span>
            </button>

            <div className="form-header">
                <h2>Host a New Stay</h2>
                <p>Fill in the details below to list your property on TravelStay</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">Property Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Modern Minimalist Mountain Chalet"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what makes your stay unique, amenities, proximity to local attractions..."
                        required
                    />
                </div>

                {/* Image Upload / URL */}
                <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    {imageUrl ? (
                        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--slate-200)', marginBottom: '12px' }}>
                            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setImageUrl(null)}
                                style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#ffffff' }}
                            >
                                Change Image
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{
                                border: '2px dashed var(--slate-300)',
                                borderRadius: '12px',
                                padding: '24px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: 'var(--slate-50)',
                                transition: 'all 200ms ease'
                            }}>
                                <UploadCloud size={32} color="var(--primary-600)" style={{ margin: '0 auto 8px auto' }} />
                                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                                    {loading ? 'Uploading image to Cloudinary...' : 'Click to browse and upload image'}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '4px' }}>PNG, JPG or WEBP</div>
                                <input type="file" onChange={handleImage} accept="image/*" style={{ display: 'none' }} />
                            </label>

                            <input
                                type="url"
                                name="imageUrl"
                                className="form-input"
                                placeholder="Or enter an image URL (e.g. Unsplash URL)..."
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>

                <div className="form-grid-2">
                    <div className="form-group">
                        <label className="form-label" htmlFor="price">Price per night (₹)</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="2500"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-grid-2">
                    <div className="form-group">
                        <label className="form-label" htmlFor="location">City / State</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-input"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Aspen, Colorado"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            className="form-input"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="e.g. United States"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '12px' }}>
                    <Plus size={18} />
                    <span>Publish Listing</span>
                </button>
            </form>
        </div>
    );
};

export default NewListing;
