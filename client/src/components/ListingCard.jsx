import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const ListingCard = ({ info }) => {
    const navigate = useNavigate();

    // Compute display rating
    const ratingValue = info.reviews && info.reviews.length > 0
        ? (info.reviews.reduce((acc, r) => acc + r.rating, 0) / info.reviews.length).toFixed(1)
        : (4.7 + (info.id % 4) * 0.1).toFixed(1);

    const reviewsCount = info.reviews?.length || (2 + (info.id % 5));

    return (
        <div className="card" onClick={() => navigate(`/${info.id}`)}>
            <div className="card-image-container">
                <img 
                    src={info.imageUrl || "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60"} 
                    alt={info.title}
                    className="card-image"
                    loading="lazy"
                />
                {info.tag && (
                    <span className="card-tag-badge">
                        {info.tag}
                    </span>
                )}
            </div>
            
            <div className="card-content">
                <div className="card-header-row">
                    <h3 className="card-location" title={info.title}>{info.title}</h3>
                    <div className="card-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span>{ratingValue}</span>
                    </div>
                </div>

                <div className="card-description">
                    <MapPin size={13} />
                    <span>{info.location ? `${info.location}, ${info.country || ''}` : 'Scenic Destination'}</span>
                </div>

                <div className="card-price">
                    <span className="price-amount">₹{Number(info.price).toLocaleString()}</span>
                    <span className="price-period">/ night</span>
                </div>
            </div>
        </div>
    );
};

export default ListingCard;
