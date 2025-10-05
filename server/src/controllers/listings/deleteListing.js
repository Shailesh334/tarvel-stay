
import prisma from '../../prismaClient.js';

const deleteListing = async(req , res)=>{
    
    const { listingId } = req.params;

    const listing = await prisma.listing.delete({
        where : {
            id : parseInt(listingId)
        }
    })

    res.json(listing);

}


export default deleteListing;
