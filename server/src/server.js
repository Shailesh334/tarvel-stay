
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


const app = express();
dotenv.config();



const PORT = process.env.PORT || 5000;
const db_url= process.env.DB_URL;



async function main(){
    const db = await mongoose.connect(db_url)
    console.log(db.connection.name)
}

main()
    .then(()=> console.log("DB Connected"))
    .catch((err) => console.log(err))




app.get("/" , (req , res)=> {
    res.send("Hello")
})

app.listen(PORT , ()=> console.log(`Listening on PORT ${PORT}`))