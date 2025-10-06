
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import listingRoutes from './routes/listingRoutes.js'
import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';

import connectWithMongoDB from './db/connection1.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// connectWithMongoDB();
app.use("/auth", authRoutes);
app.use("/", listingRoutes);        
app.use("/:listingId/reviews", reviewRoutes); 
app.use("/user/:userId", userRoutes);



app.listen(PORT , ()=> console.log(`Listening on PORT ${PORT}`))