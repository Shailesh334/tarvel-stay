

import express from 'express';
import getAllReviews from '../controllers/reviews/getAllReviews.js';
import addReview from '../controllers/reviews/addReview.js';
import authMiddleware from '../middlewares/authMiddleware.js';

import editReview from '../controllers/reviews/editReview.js';
import deletereview from '../controllers/reviews/deleteReview.js';


const router = express.Router({ mergeParams: true })



// get all reviews for a particular listing
router.get("/" , getAllReviews)


// add a review for a particular listing
router.post("/" , authMiddleware , addReview)



// Edit a review
router.patch("/:reviewId" ,authMiddleware , editReview)

// delete a review
router.delete("/:reviewId" ,authMiddleware , deletereview)






export default router;