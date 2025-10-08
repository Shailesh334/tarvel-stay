import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {   useNavigate, useParams } from "react-router-dom";
import { MapPin, Star } from 'lucide-react';
import ReviewCard from "./ReviewCard";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { API_URL } from "../api.js";

const ListingSingle = () => {
    const { listingId } = useParams();
    const [listing, setlisting] = useState({});
    const [reviews , setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [owner , setOwner] = useState({});

    const { currUserId } = useContext(AuthContext);

    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    
    const handleEdit = async () => {
        navigate(`/edit/${listingId}`)   
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        const data = await fetch(`${API_URL}/${listingId}` , {
            method: "DELETE",
            headers : {
                "Content-Type" :"application/json",
                "Authorization": token
            } 
        })
        const response = await data.json();
        toast.success("Listing deleted successfully")
        if(response)navigate(`/`);  
    }

    const handleSubmit = async() => {
        if (rating === 0) {
        toast.error('Please select a rating');
        return;
        }
        if (comment.trim() === '') {
        toast.error('Please enter a comment');
        return;
        }
        console.log({ rating, comment });
        
        const token = localStorage.getItem("token");
        try{
            const data = await fetch(`${API_URL}/${listingId}/reviews` , {
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
            if (data.status === 401) {
                toast.error("You must be logged in to perform this action");
                navigate("/login");
                return; 
            }
            const response = await data.json();
        
            console.log("response" , response);
        
            if(response){
                getReviews();
                toast.success("Review added successfully !")
            }
        }
        catch(err){
            console.log(err)
        }

        setRating(0);
        setComment('');
    };


    const getSingleListing = async () => {
        try{
            const data = await fetch(`${API_URL}/${listingId}`);
            const response = await data.json();
            if(!response){
                alert("No Such listing")
                navigate('/')
            }
            setlisting(response);
        }catch(err){
            console.log(err);
        }
    
    };

    const getOwner = async (userId) =>{
        const data = await fetch(`${API_URL}/user/${userId}`)
        const response = await data.json()

        setOwner(response)
    }

    const getReviews = async ()=>{
        try{
            const data = await fetch(`${API_URL}/${listingId}/reviews`)
            const response = await data.json();
            
            setReviews(response)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getSingleListing();
        getReviews();
        if(listing.userId){
            getOwner(listing.userId)
        }
    }, [listing.userId]);

    if(listing == "")return;
    console.log(currUserId , listing.userId , owner.id )
    return (
            <div className="detail-container">
            <img
                src={listing.imageUrl}
                alt={listing.title}
                className="listing-image"
            />
            { owner.id == currUserId &&  <>
                <div className="edit-dlt">
                    <button className="edit" onClick={handleEdit}>Edit</button>
                    <button className="dlt" onClick={handleDelete}>Delete</button>
                </div>
            </>  }
        
            <p> owned by : {owner.username}</p>
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
                                <ReviewCard key={index} review={review} listing={listing} getReviews={getReviews}/>
                            ))}

                { owner.id != currUserId && (
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
                )}
                
            </div>
            </div>
);
};

export default ListingSingle;
