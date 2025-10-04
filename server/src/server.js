
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { Listing } from './schema.js';

import connectWithMongoDB from './db/connection1.js';

const app = express();
dotenv.config();

app.use(cors());

const PORT = process.env.PORT || 5000;


connectWithMongoDB();




app.get("/" , async(req , res)=> {
    try{
        const data = await Listing.find({});
        res.send(data);
    }
    catch(err){
        console.lohg(err);
    }
    
})

app.listen(PORT , ()=> console.log(`Listening on PORT ${PORT}`))