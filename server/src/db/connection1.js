import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const db_url= process.env.DB_URL;

const connectWithMongoDB = async ()=>{
    try{
        const connect = await mongoose.connect(db_url);
    }
    catch(err){
        console.log(err);
    }
    
}


export default connectWithMongoDB;
