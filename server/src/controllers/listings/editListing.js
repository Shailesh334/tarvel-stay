
import prisma from '../../prismaClient.js';

const editListing = async(req , res)=>{
    const {title ,   description  , imageUrl ,price , location , country , tag } = req.body;
    const { listingId } = req.params;

    const listing = await prisma.listing.update({
        where: {
            id : parseInt(listingId)
        } ,
        data : {
            title , 
            description ,
            imageUrl ,
            price ,
            location ,
            country ,
            tag 
        }
    })

    res.json(listing);

}


export default editListing;