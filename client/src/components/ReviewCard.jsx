import React from 'react'
import { MapPin, Star } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { API_URL } from '../api';
const ReviewCard = ({review ,listing ,  getReviews}) => {

  const [reviewer , setReviewer] = useState('');

  const { currUserId} = useContext(AuthContext);

  const getReviewer = async ()=>{
        try{
            const data = await fetch(`${API_URL}/user/${review.userId}`)
            const response = await data.json();
            
            setReviewer(response)

        }catch(err){
            console.log(err)
        }
    }


    const handleDelete = async () =>{
        const token = localStorage.getItem("token");
        const data = await fetch(`${API_URL}/${listing.id}/reviews/${review.id}` , {
            method: "DELETE",
            headers : {
                "Content-Type" :"application/json",
                "Authorization": token
            } 
        })
        const response = await data.json();
        toast.success("Review deleted successfully" , {duration : 3000})
        if(response){
            getReviews();
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

            {
                currUserId == review.userId && (
                    <div className="dlt-btn" onClick={handleDelete}>
                        <button>Delete</button>
                    </div>
                )
            }
        
        </div>
  )
}

export default ReviewCard
