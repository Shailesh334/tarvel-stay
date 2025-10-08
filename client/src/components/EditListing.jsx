import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '../api.js';

const EditListing = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        country: '',
        location: '',
        category: '',
        imageUrl : '',
    });

    

    const { isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();
    const categories = [
        'Beachfront',
        'Cabins',
        'Trending',
        'Countryside',
        'Amazing pools',
        'Islands',
        'Lakefront',
        'Design',
        'Caves',
        'Camping',
        'Castles',
        'Skiing',
        'Tiny homes'
    ];
    const { listingId } = useParams();

    const getSingleListing = async () => {
        try{
            const data = await fetch(`${API_URL}/${listingId}`);
            const response = await data.json();
            if(!response) return (<h1>No Such Listing</h1>)
            setFormData({
                title : response.title ,
                description : response.description ,
                price : response.price ,
                country : response.country ,
                location : response.location ,
                category : response.category ,
                imageUrl : response.imageUrl ,
            });
            setImageUrl(formData.imageUrl)
        }catch(err){
            console.log(err);
        }
    
    };

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

        console.log(cloudName , uploadPreset)
        const [loading , setLoading] = useState(false);
        const [imageUrl , setImageUrl] = useState(false);
    
        const handleImage = async(event) =>{
            const file = event.target.files[0];
    
            if(!file)return
            setLoading(true);
    
            const data = new FormData();
            data.append("file" , file)
            data.append("upload_preset" , "stays_image_upload")
            data.append("cloud_name" , "dvrrbqmuo")
    
            const res = await fetch( `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload` , {
                method : "POST",
                body : data
            })
            const uploadImageUrl = await res.json();
            setLoading(false);
            setImageUrl(uploadImageUrl.secure_url)
        }

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });

    };
    useEffect(() => {
        if (!isAuthenticated) {
         toast.error("You must be logged in add listing !")
          navigate("/login"); // redirect if not logged in
        }
        getSingleListing();
    }, [isAuthenticated, navigate]); 

    const handleSubmit = async() => {
        console.log('Form submitted:', formData);
        const token = localStorage.getItem("token");
        const data = await fetch(`${API_URL}/${listingId}` , {
            method: "PATCH",
            headers : {
                "Content-Type" :"application/json",
                "Authorization": token
            },
            body:JSON.stringify({
                title : formData.title,
                description : formData.description,
                imageUrl : imageUrl || formData.imageUrl,
                country : formData.country,
                price : parseInt(formData.price),
                location : formData.location,
                tag : formData.category,
            })
        })
        const response = await data.json();
        toast.success("Listing updated successfully")
        if(response)navigate(`/${listingId}`);
        
    };
    

   



    if(!isAuthenticated)return null;
    return (
            <div className="container">
                <h1>Edit Listing</h1>
                <p className="subtitle">Fill in the details to edit your listing</p>

                <div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Cozy Beach House"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your listing..."
                    required
                    />
                </div>

            {
                loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                        <p>Uploading image...</p>
                    </div>
                ) : imageUrl ? (
                    <div className="image-preview">
                    <img src={imageUrl} alt="Preview" className="preview-img" />
                    <button className="change-btn" onClick={() => setImageUrl(null)}>
                        Change Image
                    </button>
                    </div>
                ) : (
                    <div className="form-group">
                    <label>Upload Image</label>
                    <input type="file" onChange={handleImage} required />
                    </div>
                )
            }

                <div className="form-group">
                    <label htmlFor="price">Price (per night)</label>
                    <div className="price-input">
                    <span className="price-symbol">₹</span>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="100"
                        min="0"
                        required
                    />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g., United States"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Miami, Florida"
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                </div>

                <button onClick={handleSubmit} className="submit-btn">
                    Save Changes
                </button>
                </div>
            </div>
    )
}

export default EditListing
