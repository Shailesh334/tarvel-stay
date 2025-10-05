
import prisma from "../../prismaClient.js";

const getAllReviews = async(req , res) =>{
    const {listingId} = req.params;

    const reviews = await prisma.review.findMany({
        where :{
            listingId : parseInt(listingId)
        }
    })

    res.json(reviews);

}



export default getAllReviews;