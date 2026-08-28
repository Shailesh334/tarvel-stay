import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UploadCloud, Save, ArrowLeft } from 'lucide-react';
import { API_URL } from '../api.js';

const EditListing = () => {
    const { listingId } = useParams();
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
    const [imageUrl, setImageUrl] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const getSingleListing = async () => {
        try {
            const data = await fetch(`${API_URL}/${listingId}`);
            const response = await data.json();
            if (!response) {
                toast.error("Listing not found");
                navigate('/');
                return;
            }
            setFormData({
                title: response.title || '',
                description: response.description || '',
                price: response.price || '',
                country: response.country || '',
                location: response.location || '',
                category: response.tag || 'beach',
                imageUrl: response.imageUrl || '',
            });
            setImageUrl(response.imageUrl || '');
        } catch (err) {
            console.error("Fetch listing for edit error:", err);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must be logged in to edit!");
            navigate("/login");
            return;
        }
        getSingleListing();
    }, [isAuthenticated, listingId]);

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
                toast.success("Image updated successfully!");
            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Failed to upload image");
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
        if (!title || !description || !country || !price || !location) {
            toast.error("Please fill in all fields");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const data = await fetch(`${API_URL}/${listingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    imageUrl: imageUrl || formData.imageUrl,
                    country: formData.country,
                    price: parseInt(formData.price),
                    location: formData.location,
                    tag: formData.category,
                })
            });

            const response = await data.json();
            if (response) {
                toast.success("Listing updated successfully!");
                navigate(`/${listingId}`);
            }
        } catch (err) {
            console.error("Update listing error:", err);
            toast.error("Failed to update listing");
        }
    };

    return (
        <div className="form-page-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={16} />
                <span>Cancel</span>
            </button>

            <div className="form-header">
                <h2>Edit Listing</h2>
                <p>Update property information, pricing, or media</p>
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
                        required
                    />
                </div>

                {/* Cover Image */}
                <div className="form-group">
                    <label className="form-label">Cover Image</label>
                    {imageUrl ? (
                        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--slate-200)', marginBottom: '12px' }}>
                            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <button 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={() => setImageUrl('')}
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
                                background: 'var(--slate-50)'
                            }}>
                                <UploadCloud size={32} color="var(--primary-600)" style={{ margin: '0 auto 8px auto' }} />
                                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                                    {loading ? 'Uploading...' : 'Upload new image'}
                                </div>
                                <input type="file" onChange={handleImage} accept="image/*" style={{ display: 'none' }} />
                            </label>

                            <input
                                type="url"
                                name="imageUrl"
                                className="form-input"
                                placeholder="Or enter an image URL..."
                                value={formData.imageUrl}
                                onChange={(e) => {
                                    handleChange(e);
                                    setImageUrl(e.target.value);
                                }}
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
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '12px' }}>
                    <Save size={18} />
                    <span>Save Changes</span>
                </button>
            </form>
        </div>
    );
};

export default EditListing;
