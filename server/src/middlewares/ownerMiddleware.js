import prisma from "../prismaClient.js";


const ownerMiddleware = async(req , res , next) =>{
    const { listingId } = req.params;

    const listing = await prisma.listing.findUnique({
        where : {
            id : parseInt(listingId)
        }
    })



    if(req.userId != listing.userId)return res.status(401).json({message: "unauthorized user"});

    next();

}


export default ownerMiddleware;