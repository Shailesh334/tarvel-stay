import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin, Star } from 'lucide-react';
import ReviewCard from "./ReviewCard";

const ListingSingle = () => {
    const { listingId } = useParams();
    const [listing, setlisting] = useState([]);
    const [reviews , setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async() => {
        if (rating === 0) {
        alert('Please select a rating');
        return;
        }
        if (comment.trim() === '') {
        alert('Please enter a comment');
        return;
        }
        console.log({ rating, comment });
        alert('Review submitted successfully!');
        const token = localStorage.getItem("token");
        try{
            const data = await fetch(`http://localhost:5000/${listingId}/reviews` , {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : token
                },
                body : JSON.stringify({
                    rating : rating ,
                    message : comment
                })
            })
            const response = await data.json();
            console.log(response);
            if(response){
                getReviews();
            }
        }
        catch(err){
            console.log(err);
        }

        setRating(0);
        setComment('');
    };


    const getSingleListing = async () => {
        try{
            const data = await fetch(`http://localhost:5000/${listingId}`);
            const response = await data.json();
            if(!response) return (<h1>No Such Listing</h1>)
            setlisting(response);
        }catch(err){
            console.log(err);
        }
    
    };

    const getReviews = async ()=>{
        try{
            const data = await fetch(`http://localhost:5000/${listingId}/reviews`)
            const response = await data.json();
            
            setReviews(response)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getSingleListing();
        getReviews();
    }, []);

    if(listing == "")return;

    return (
            <div className="detail-container">
            <img
                src={listing.imageUrl}
                alt={listing.title}
                className="listing-image"
            />

            <div className="content-card">
                <h1 className="listing-title">{listing.title}</h1>

                <div className="info-row">
            
                <div className="info-item">
                    <MapPin size={20} />
                    <span>{listing.location}</span>
                </div>
                </div>

                <div className="price">
                ₹{listing.price} <span className="price-period">/ night</span>
                </div>

                <div className="description">{listing.description}</div>
            </div>

            <div className="reviews-section">
                <h2 className="reviews-title">Reviews</h2>

                            {reviews.map((review, index) => (
                                <ReviewCard key={index} review={review}/>
                            ))}

                    <div className="review-container">
        <h1 className="review-title">Leave a review</h1>

            <div className="rating-section">
            <label className="section-label">Rating</label>
            <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    className="star-btn"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                >
                    <Star
                    className={`star-icon ${
                        star <= (hoveredRating || rating)
                        ? hoveredRating >= star
                            ? 'hovered'
                            : 'filled'
                        : ''
                    }`}
                    />
                </button>
                ))}
            </div>
            </div>

            <div className="comment-section">
            <label className="section-label">Comment</label>
            <textarea
                className="comment-textarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
            />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
            Submit
            </button>
        </div>
            </div>
            </div>
);
};

export default ListingSingle;
