import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Star } from 'lucide-react';
import ReviewCard from "./ReviewCard";

const ListingSingle = () => {
    const { listingId } = useParams();
    const [listing, setlisting] = useState([]);
    const [reviews , setReviews] = useState([]);
  

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
            </div>
            </div>
);
};

export default ListingSingle;
