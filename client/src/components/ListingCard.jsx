import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListingCard = ({info}) => {
    const navigate = useNavigate();
    return (
            <div className="card" onClick={()=> navigate(`/${info.id}`)}>
                <div className="card-image-container">
                <img 
                    src={info.imageUrl} 
                    alt={info.title}
                    className="card-image"
                />
        
                </div>
                
                <div className="card-content">
                <div className="card-location">{info.title}</div>
                <div className="card-description">{info.location || 'Beautiful location'}</div>
                <div className="card-rating">
                    <span className="star">★</span>
                    <span>{info.rating || Math.floor(Math.random()*4)+1}.{Math.random()<0.5 ? 5 : 0} </span>
                </div>
                <div className="card-price">
                    <span className="price-amount">₹{info.price}</span>
                    <span className="price-period"> / night</span>
                </div>
                </div>
            </div>

    )
}

export default ListingCard
