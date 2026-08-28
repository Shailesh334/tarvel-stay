import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
    MapPin, 
    Star, 
    ArrowLeft, 
    Check, 
    Wifi, 
    Car, 
    Sparkles, 
    ShieldCheck, 
    Edit3, 
    Trash2,
    Calendar,
    Send
} from 'lucide-react';
import ReviewCard from "./ReviewCard";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { API_URL } from "../api.js";

const ListingSingle = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currUserId, isAuthenticated } = useContext(AuthContext);

    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    
    const handleEdit = () => {
        navigate(`/edit/${listingId}`);
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        const token = localStorage.getItem("token");
        try {
            const data = await fetch(`${API_URL}/${listingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                } 
            });
            const response = await data.json();
            toast.success("Listing deleted successfully");
            if (response) navigate(`/`);  
        } catch (err) {
            console.error("Delete listing error:", err);
            toast.error("Failed to delete listing");
        }
    };

    const handleSubmitReview = async () => {
        if (!isAuthenticated) {
            toast.error("Please sign in to write a review");
            navigate("/login");
            return;
        }
        if (rating === 0) {
            toast.error('Please select a star rating');
            return;
        }
        if (comment.trim() === '') {
            toast.error('Please enter a review message');
            return;
        }
        
        const token = localStorage.getItem("token");
        try {
            const data = await fetch(`${API_URL}/${listingId}/reviews`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    rating: rating,
                    message: comment
                })
            });
            if (data.status === 401) {
                toast.error("You must be logged in to perform this action");
                navigate("/login");
                return; 
            }
            const response = await data.json();
        
            if (response) {
                getReviews();
                toast.success("Review posted successfully!");
                setRating(0);
                setComment('');
            }
        } catch (err) {
            console.error("Review submit error:", err);
            toast.error("Failed to submit review");
        }
    };

    const getSingleListing = async () => {
        try {
            const data = await fetch(`${API_URL}/${listingId}`);
            const response = await data.json();
            if (!response || response.message) {
                toast.error("Listing not found");
                navigate('/');
                return;
            }
            setListing(response);
            if (response.userId) {
                getOwner(response.userId);
            }
        } catch (err) {
            console.error("Get listing error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getOwner = async (userId) => {
        try {
            const data = await fetch(`${API_URL}/user/${userId}`);
            const response = await data.json();
            setOwner(response);
        } catch (err) {
            console.error("Get owner error:", err);
        }
    };

    const getReviews = async () => {
        try {
            const data = await fetch(`${API_URL}/${listingId}/reviews`);
            const response = await data.json();
            if (Array.isArray(response)) {
                setReviews(response);
            }
        } catch (err) {
            console.error("Get reviews error:", err);
        }
    };

    useEffect(() => {
        getSingleListing();
        getReviews();
    }, [listingId]);

    if (loading || !listing) {
        return (
            <div className="single-listing-container" style={{ padding: '60px 0', textAlign: 'center' }}>
                <p style={{ color: 'var(--slate-500)', fontSize: '1.1rem' }}>Loading stay details...</p>
            </div>
        );
    }

    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    const hostName = owner?.username || "Superhost";
    const hostInitial = hostName.charAt(0).toUpperCase();

    return (
        <div className="single-listing-container">
            {/* Header with Title & Back Navigation */}
            <div className="single-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} />
                    <span>Back to all stays</span>
                </button>
                <h1 className="single-title">{listing.title}</h1>
                <div className="single-submeta">
                    <div className="single-submeta-item">
                        <Star size={16} fill="#f59e0b" color="#f59e0b" />
                        <strong style={{ color: 'var(--slate-900)' }}>{averageRating}</strong>
                        <span>({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
                    </div>
                    <span>•</span>
                    <div className="single-submeta-item">
                        <MapPin size={16} />
                        <span>{listing.location}, {listing.country}</span>
                    </div>
                    {listing.tag && (
                        <>
                            <span>•</span>
                            <span className="card-tag-badge" style={{ position: 'static', display: 'inline-block' }}>
                                {listing.tag}
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Hero Gallery */}
            <div className="single-gallery">
                <img 
                    src={listing.imageUrl || "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=1200&q=80"} 
                    alt={listing.title} 
                />
            </div>

            {/* Two Column Layout */}
            <div className="single-layout">
                {/* Left Column: Details, Amenities, Host, Reviews */}
                <div className="single-details-col">
                    {/* Host Profile Box */}
                    <div className="host-badge-box">
                        <div className="host-info">
                            <div className="avatar-circle">
                                {hostInitial}
                            </div>
                            <div className="host-text">
                                <h4>Hosted by {hostName}</h4>
                                <p>Superhost • Fast response time</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-600)', fontSize: '0.85rem', fontWeight: 600 }}>
                            <ShieldCheck size={18} />
                            <span>Identity Verified</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="description-box">
                        <h3>About this space</h3>
                        <p>{listing.description || "Experience the utmost comfort in this thoughtfully designed retreat with premium furnishings, tranquil surroundings, and everything needed for a memorable trip."}</p>
                    </div>

                    {/* Amenities Highlights */}
                    <div className="amenities-box">
                        <h3>What this place offers</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                            <div className="booking-feature-item">
                                <Wifi size={18} />
                                <span>High-speed optical fiber WiFi</span>
                            </div>
                            <div className="booking-feature-item">
                                <Car size={18} />
                                <span>Free parking on premises</span>
                            </div>
                            <div className="booking-feature-item">
                                <Sparkles size={18} />
                                <span>Dedicated workspace & comfort</span>
                            </div>
                            <div className="booking-feature-item">
                                <Check size={18} />
                                <span>Self check-in with keypad</span>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="reviews-container">
                        <div className="reviews-section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <h3>Guest Reviews</h3>
                                <div className="single-submeta-item" style={{ background: 'var(--slate-100)', padding: '4px 10px', borderRadius: '8px' }}>
                                    <Star size={15} fill="#f59e0b" color="#f59e0b" />
                                    <strong>{averageRating}</strong>
                                    <span>({reviews.length})</span>
                                </div>
                            </div>
                        </div>

                        {/* Add Review Form */}
                        {owner?.id !== currUserId && (
                            <div className="add-review-card">
                                <h4>Leave a Review</h4>
                                <p style={{ fontSize: '0.88rem', color: 'var(--slate-500)', marginBottom: '14px' }}>
                                    Share your experience with future travelers
                                </p>

                                <div className="star-picker">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="star-btn"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            title={`${star} Star`}
                                        >
                                            <Star
                                                size={22}
                                                fill={(hoveredRating || rating) >= star ? "#f59e0b" : "none"}
                                                color={(hoveredRating || rating) >= star ? "#f59e0b" : "var(--slate-300)"}
                                            />
                                        </button>
                                    ))}
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-600)', marginLeft: '8px' }}>
                                        {rating > 0 ? `${rating} of 5 Stars` : 'Select stars'}
                                    </span>
                                </div>

                                <textarea
                                    className="review-textarea"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="What did you love about this stay? Describe the location, host, and cleanliness..."
                                    rows={3}
                                />

                                <button className="btn btn-primary" onClick={handleSubmitReview}>
                                    <Send size={15} />
                                    <span>Post Review</span>
                                </button>
                            </div>
                        )}

                        {/* Reviews Grid */}
                        {reviews.length === 0 ? (
                            <p style={{ color: 'var(--slate-500)', fontSize: '0.92rem' }}>No reviews yet. Be the first to leave a review!</p>
                        ) : (
                            <div className="reviews-grid">
                                {reviews.map((rev) => (
                                    <ReviewCard 
                                        key={rev.id} 
                                        review={rev} 
                                        listing={listing} 
                                        getReviews={getReviews} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Sticky Booking & Owner Actions */}
                <div className="single-sidebar">
                    <div className="booking-card">
                        <div className="booking-price-row">
                            <div>
                                <span className="booking-price">₹{Number(listing.price).toLocaleString()}</span>
                                <span className="price-period"> / night</span>
                            </div>
                            <div className="card-rating">
                                <Star size={13} fill="#f59e0b" color="#f59e0b" />
                                <span>{averageRating}</span>
                            </div>
                        </div>

                        <div className="booking-features-list">
                            <div className="booking-feature-item">
                                <Check size={16} />
                                <span>Instant Confirmation</span>
                            </div>
                            <div className="booking-feature-item">
                                <Check size={16} />
                                <span>Free cancellation up to 48 hours</span>
                            </div>
                            <div className="booking-feature-item">
                                <Check size={16} />
                                <span>No hidden service fees</span>
                            </div>
                        </div>

                        <button 
                            className="booking-btn"
                            onClick={() => toast.success("Booking inquiry sent to host! Safe travels.")}
                        >
                            Reserve Stay
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--slate-400)', marginTop: '10px' }}>
                            You won't be charged yet
                        </p>

                        {/* Owner Controls */}
                        {owner?.id === currUserId && (
                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--slate-100)' }}>
                                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-500)', marginBottom: '8px', textTransform: 'uppercase' }}>
                                    Host Management
                                </div>
                                <div className="owner-actions">
                                    <button className="btn btn-secondary" onClick={handleEdit}>
                                        <Edit3 size={15} />
                                        <span>Edit</span>
                                    </button>
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        <Trash2 size={15} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingSingle;
