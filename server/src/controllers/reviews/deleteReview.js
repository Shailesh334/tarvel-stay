
import prisma from '../../prismaClient.js';

const deletereview = async(req , res)=>{

    const {listingId , reviewId} = req.params;

    const review = await prisma.review.findUnique({
        where:{
            id : parseInt(reviewId)
        }
    })

    if(review.userId != req.userId)return res.status(401).json({message : "Unauthorized user"});

    const deletedreview = await prisma.review.delete({
        where:{
            id : parseInt(reviewId)
        }
    })


    res.json(deletedreview);

}


export default deletereview;

