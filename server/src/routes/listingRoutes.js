
import prisma from '../prismaClient.js';
import express from 'express';


const router = express.Router();

// Get all listings
router.get('/' , async(req , res) =>{
    try{
        const data = await prisma.listing.findMany({});
        res.json(data);
    }
    catch(err){
        console.log(err);
    }
});

// Add new listing



export default router;