import React, { useState, useEffect, useContext } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { API_URL } from '../api';

const ReviewCard = ({ review, listing, getReviews }) => {
    const [reviewer, setReviewer] = useState(null);
    const { currUserId } = useContext(AuthContext);

    const getReviewer = async () => {
        try {
            const data = await fetch(`${API_URL}/user/${review.userId}`);
            const response = await data.json();
            setReviewer(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            const data = await fetch(`${API_URL}/${listing.id}/reviews/${review.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const response = await data.json();
            toast.success("Review deleted successfully", { duration: 3000 });
            if (response) {
                getReviews();
            }
        } catch (err) {
            console.error("Delete review error:", err);
            toast.error("Could not delete review");
        }
    };

    useEffect(() => {
        getReviewer();
    }, [review.userId]);

    const username = reviewer?.username || "Verified Guest";
    const initial = username.charAt(0).toUpperCase();

    return (
        <div className="review-card-item">
            <div className="review-card-top">
                <div className="reviewer-profile">
                    <div className="reviewer-avatar">
                        {initial}
                    </div>
                    <div>
                        <div className="reviewer-name">{username}</div>
                        <div className="review-stars">
                            {[...Array(review.rating || 5)].map((_, i) => (
                                <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                            ))}
                        </div>
                    </div>
                </div>

                {currUserId === review.userId && (
                    <button 
                        className="btn btn-danger" 
                        onClick={handleDelete}
                        title="Delete review"
                        style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>

            <p className="review-comment-text">{review.message}</p>
        </div>
    );
};

export default ReviewCard;
