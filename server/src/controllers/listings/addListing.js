
import prisma from '../../prismaClient.js';

const addListing = async(req , res)=>{
        const {title ,   description  , imageUrl ,price , location , country , tag } = req.body;

         // Validation check
        if (!title || !description || !price || !location || !country || !tag) {
        return res.status(400).json({ message: "All fields are required" });
        }

        const listing = await prisma.listing.create({
            data : {
                title , 
                description ,
                imageUrl ,
                price ,
                location ,
                country ,
                tag ,
                userId : req.userId 
            }
        })

    res.json(listing);

}


export default addListing;
