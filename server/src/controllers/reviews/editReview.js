
import prisma from '../../prismaClient.js';

const editReview = async(req , res)=>{
    const {rating ,   message  } = req.body;
    const {listingId , reviewId} = req.params;

    const review = await prisma.review.findUnique({
        where:{
            id : parseInt(reviewId)
        }
    })

    if(review.userId != req.userId)return res.status(401).json({message : "Unauthorized user"});

    const updatedreview = await prisma.review.update({
        where:{
            id : parseInt(reviewId)
        },
        data : {
            rating , 
            message ,
            userId : parseInt(req.userId) ,
            listingId : parseInt(listingId)
        }
    })


    res.json(updatedreview);

}


export default editReview;
