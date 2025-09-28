import express from 'express'

import initData from './data.js'
import mongoose from 'mongoose';
import { Listing } from '../schema.js';

const app = express();

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch(err =>{
        console.log(err);
    });



async function main(){
        await mongoose.connect('mongodb://127.0.0.1:27017/travelstay')
        // await intialize_data()
};

let arr = [ "trending" , "topcities" ,"artic" ,"mountains" ,"countryside" ,"farms" ,"beach" ];

const intialize_data =  async() => {
    await Listing.deleteMany({});

    initData.data = initData.data.map((obj)=> ({
        ...obj,
        owner : "67b1ddf9e2ce8b58f8e3ba60",
        tag : arr[Math.floor(Math.random() * arr.length)]
    }));

    await Listing.insertMany(initData.data);
}







app.listen(5001 , console.log(`Listening on Port 5001`));