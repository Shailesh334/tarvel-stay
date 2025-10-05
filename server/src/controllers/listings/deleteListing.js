
import prisma from '../../prismaClient.js';

const deleteListing = async(req , res)=>{
    
    const { id } = req.params;

    const listing = await prisma.listing.delete({
        where : {
            id : parseInt(id)
        }
    })

    res.json(listing);

}


export default deleteListing;
