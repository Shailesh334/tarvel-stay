
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import listingRoutes from './routes/listingRoutes.js'
import authRoutes from './routes/authRoutes.js';


import connectWithMongoDB from './db/connection1.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// connectWithMongoDB();
app.use("/auth" , authRoutes);
app.use("/" , listingRoutes);




app.listen(PORT , ()=> console.log(`Listening on PORT ${PORT}`))