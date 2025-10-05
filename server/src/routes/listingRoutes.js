

import express from 'express';


import getAllListings from '../controllers/listings/getAllListings.js';
import addListing from '../controllers/listings/addListing.js';
import editListing from '../controllers/listings/editListing.js';
import deleteListing from '../controllers/listings/deleteListing.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import ownerMiddleware from '../middlewares/ownerMiddleware.js';



const router = express.Router();

// Get all listings
router.get('/' , getAllListings);


// Add new listing
router.post("/" , authMiddleware  , addListing);


// Edit a listing
router.patch("/:listingId" ,authMiddleware , ownerMiddleware , editListing)

// delete a listing
router.delete("/:listingId" ,authMiddleware , ownerMiddleware , deleteListing)



export default router;