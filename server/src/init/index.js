import express from 'express'

import prisma from '../prismaClient.js';


import initData from './data.js'
// import mongoose from 'mongoose';
import { Listing } from '../schema.js';

const app = express();



let arr = [ "trending" , "topcities" ,"artic" ,"mountains" ,"countryside" ,"farms" ,"beach" ];

// const intialize_data =  async() => {
//     await Listing.deleteMany({});

//     initData.data = initData.data.map((obj)=> ({
//         ...obj,
//         owner : "67b1ddf9e2ce8b58f8e3ba60",
//         tag : arr[Math.floor(Math.random() * arr.length)]
//     }));

//     await Listing.insertMany(initData.data);
// }



const listingsToInsert  = initData.data.map((listing)=>({
    title: listing.title,
    description: listing.description,
    imageUrl: listing.image.url,
    location:listing.location,
    country:listing.country,
    price: listing.price,
    userId: 1,
    tag : arr[Math.floor(Math.random() * arr.length)]
}))

const initialize_data = async()=>{
    try{
         const data = await prisma.listing.createMany({
        data : listingsToInsert,
        
    })
    console.log(data);
    }
    catch(err){
        console.log(err);
    }
   
}

// await initialize_data();


// await prisma.user.create({
//     data : {
//         username : "mangesh",
//         password: "31",
//         email : "mangesh@gmail.com",
        
//     }
// });

app.listen(5001 , console.log(`Listening on Port 5001`));