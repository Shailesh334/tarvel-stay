



import express from 'express';
import prisma from '../prismaClient.js';



const router = express.Router({ mergeParams: true })



// get all reviews for a particular listing
router.get("/" , async(req , res)=>{

    const {userId} = req.params;
 
    const user = await prisma.user.findUnique({
        where :{
            id : parseInt(userId)
        }
    })

    res.json(user)
})








export default router;