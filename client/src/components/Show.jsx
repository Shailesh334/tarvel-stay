
import { useEffect } from 'react';
import ListingCard from './ListingCard';
import { useState } from 'react';
import { Flame, Building2, Snowflake, Mountain, Tractor, Home } from 'lucide-react';
import { API_URL } from '../api.js';
const Show = () => {

    const [listings , setListings] = useState([]);
        const [activeFilter, setActiveFilter] = useState('');

    const filters = [
        { name: 'trending', icon: Flame, path: '/listings/filter/trending' },
        { name: 'top cities', icon: Building2, path: '/listings/filter/topcities' },
        { name: 'artic', icon: Snowflake, path: '/listings/filter/artic' },
        { name: 'mountains', icon: Mountain, path: '/listings/filter/mountains' },
        { name: 'countryside', icon: Tractor, path: '/listings/filter/countryside' },
        { name: 'farms', icon: Home, path: '/listings/filter/farms' },
        { name: 'beach', icon: Home, path: '/listings/filter/beach' }
    ];

  const handleFilterClick = (filterName) => {
    setActiveFilter(filterName);
    console.log(`Filter clicked: ${filterName}`);
  };
    const getData = async()=>{
        const data = await fetch(`${API_URL}/`);
        const res = await data.json();
        setListings(res);
    }

    useEffect(()=>{
        getData()
    }, []);

    return (
            <>
                
                {/* <div id="filters">
                    {filters.map((filter) => {
                        const IconComponent = filter.icon;
                        return (
                        <a
                            key={filter.name}
                            href={filter.path}
                            className="filter-link"
                            onClick={(e) => {
                            e.preventDefault();
                            handleFilterClick(filter.name);
                            }}
                        >
                            <div className={`filters ${activeFilter === filter.name ? 'active' : ''}`}>
                                <div className="icon">
                                    <IconComponent size={24} />
                                </div>
                                <div>{filter.name}</div>
                            </div>
                        </a>
                        );
                    })}
                </div> */}
                
                
                    <div className="main-container">

                            {
                                listings.map((listing) => ( <ListingCard key={listing.id} info={listing}/>))
                            }
                                
                    </div>
                
                
                


            </>
    
    )
}

export default Show
