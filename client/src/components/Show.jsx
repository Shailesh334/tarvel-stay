
import { useEffect } from 'react';
import ListingCard from './ListingCard';
import { useState } from 'react';

const Show = () => {

    const [listings , setListings] = useState([]);

    const getData = async()=>{
        const data = await fetch("http://localhost:5000/");
        const res = await data.json();
        setListings(res);
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
        
            <div className="main-container">
                {
                    listings.map((listing) => ( <ListingCard info={listing}/>))
                }
                    
            </div>
    
    )
}

export default Show
