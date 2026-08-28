import React, { useEffect, useState, useMemo } from 'react';
import ListingCard from './ListingCard';
import { 
    Flame, 
    Building2, 
    Snowflake, 
    Mountain, 
    Tractor, 
    Palmtree, 
    TreePine, 
    Sparkles, 
    Search, 
    X,
    Compass
} from 'lucide-react';
import { API_URL } from '../api.js';

const Show = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = [
        { id: 'all', name: 'All Stays', icon: Sparkles },
        { id: 'trending', name: 'Trending', icon: Flame },
        { id: 'beach', name: 'Beachfront', icon: Palmtree },
        { id: 'mountains', name: 'Mountains', icon: Mountain },
        { id: 'topcities', name: 'Top Cities', icon: Building2 },
        { id: 'countryside', name: 'Countryside', icon: TreePine },
        { id: 'farms', name: 'Farms & Nature', icon: Tractor },
        { id: 'artic', name: 'Arctic & Cabins', icon: Snowflake }
    ];

    const getData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/`);
            const res = await response.json();
            if (Array.isArray(res)) {
                setListings(res);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // Filter and search logic
    const filteredListings = useMemo(() => {
        return listings.filter(item => {
            const matchesFilter = activeFilter === 'all' || 
                (item.tag && item.tag.toLowerCase().trim() === activeFilter.toLowerCase().trim());
            
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch = !q || 
                (item.title && item.title.toLowerCase().includes(q)) ||
                (item.location && item.location.toLowerCase().includes(q)) ||
                (item.country && item.country.toLowerCase().includes(q)) ||
                (item.tag && item.tag.toLowerCase().includes(q));

            return matchesFilter && matchesSearch;
        });
    }, [listings, activeFilter, searchQuery]);

    const handleClearFilters = () => {
        setActiveFilter('all');
        setSearchQuery('');
    };

    return (
        <div className="browse-page">
            {/* Search Bar */}
            <div className="browse-hero">
                <div className="search-sticky-container">
                    <div className="search-bar-box">
                        <Search size={18} color="var(--slate-400)" style={{ marginRight: '10px' }} />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by destination, stay name, or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery('')}
                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', marginRight: '6px' }}
                            >
                                <X size={16} />
                            </button>
                        )}
                        <button className="search-btn" title="Search">
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                {/* Categories Filter Bar */}
                <div className="category-filter-bar">
                    {filters.map((filter) => {
                        const IconComponent = filter.icon;
                        const isActive = activeFilter === filter.id;
                        return (
                            <button
                                key={filter.id}
                                className={`filter-pill ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.id)}
                            >
                                <IconComponent size={16} />
                                <span>{filter.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Listings Meta Header */}
            <div className="listings-meta-header">
                <div className="listings-count">
                    {loading ? 'Discovering stays...' : `${filteredListings.length} ${filteredListings.length === 1 ? 'Stay' : 'Stays'} Available`}
                    {activeFilter !== 'all' && <span>• {filters.find(f => f.id === activeFilter)?.name}</span>}
                    {searchQuery && <span>• Matching "{searchQuery}"</span>}
                </div>

                {(activeFilter !== 'all' || searchQuery) && (
                    <button 
                        onClick={handleClearFilters}
                        className="btn btn-secondary"
                        style={{ padding: '4px 12px', fontSize: '0.8rem', borderRadius: '9999px' }}
                    >
                        Reset filters
                    </button>
                )}
            </div>

            {/* Loading Skeletons */}
            {loading && (
                <div className="main-container">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="skeleton-card">
                            <div className="skeleton-img"></div>
                            <div className="skeleton-text" style={{ width: '70%' }}></div>
                            <div className="skeleton-text" style={{ width: '40%' }}></div>
                            <div className="skeleton-text" style={{ width: '50%' }}></div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredListings.length === 0 && (
                <div className="empty-state">
                    <div className="empty-state-icon">
                        <Compass size={28} />
                    </div>
                    <h3>No properties match your search</h3>
                    <p>Try searching for a different destination or clear your category filters.</p>
                    <button onClick={handleClearFilters} className="btn btn-primary">
                        View All Listings
                    </button>
                </div>
            )}

            {/* Listings Grid */}
            {!loading && filteredListings.length > 0 && (
                <div className="main-container">
                    {filteredListings.map((listing) => (
                        <ListingCard key={listing.id} info={listing} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Show;
