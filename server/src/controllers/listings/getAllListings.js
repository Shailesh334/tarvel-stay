
import prisma from '../../prismaClient.js';

const getAllListings = async(req , res) =>{
    try{
        const data = await prisma.listing.findMany({});
        res.json(data);
    }
    catch(err){
        console.log(err);
    }
};



export default getAllListings;