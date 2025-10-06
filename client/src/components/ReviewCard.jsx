import React from 'react'
import { MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
const ReviewCard = ({review}) => {

  const [reviewer , setReviewer] = useState('');

  const getReviewer = async ()=>{
        try{
            const data = await fetch(`http://localhost:5000/user/${review.userId}`)
            const response = await data.json();
            
            setReviewer(response)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getReviewer();
    }, [])

  return (
      <div className="review-card">
                                        <div className="review-header">
                                            <span className="reviewer-name">{reviewer.username}</span>
                            
                                        </div>
                                        <div className="review-rating">
                                            {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                                            ))}
                                        </div>
                                        <p className="review-comment">{review.message}</p>
    </div>
  )
}

export default ReviewCard
