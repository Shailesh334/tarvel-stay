import React from 'react'

const ListingCard = ({info}) => {
    console.log(info)
    return (
        <div className='card'>
            <img src={info.image.url} alt="listing_img" />
            <h3>{info.title}</h3>
            <h4>Rs. {info.price} /-</h4>
        </div>
    )
}

export default ListingCard
