
import prisma from '../../prismaClient.js';

const addReview = async(req , res)=>{
    const {rating ,   message  } = req.body;
    const {listingId} = req.params;

    const review = await prisma.review.create({
        data : {
            rating , 
            message ,
            userId : parseInt(req.userId) ,
            listingId : parseInt(listingId)
        }
    })

    res.json(review);

}


export default addReview;
