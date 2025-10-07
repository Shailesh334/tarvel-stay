import prisma from "../../prismaClient.js"

const singleListing = async(req , res)=>{
    const { listingId } = req.params;
    console.log(req.params)
    const listing = await prisma.listing.findUnique({
        where:{
            id : parseInt(listingId)
        }
    })

    res.json(listing)
}


export default singleListing;