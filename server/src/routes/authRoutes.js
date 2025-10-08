import express from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prismaClient.js';
import jwt from 'jsonwebtoken';

const router = express.Router();


// store a use in user table
router.post('/register' , async(req , res)=>{
    const { username , email , password} = req.body;

    const hashedPassword = bcrypt.hashSync(password , 8);

    try {
        const user = await prisma.user.create({
            data : {
                username : username ,
                password : hashedPassword ,
                email : email
            }
        
        })
        const token = jwt.sign({id : user.id} , process.env.JWT_SECRET_KEY , {expiresIn: '24h'});
        res.json({
            token : token ,
            user : user
        });
    }
    catch(err){
        console.log(err)
          if (err.code === 'P2002') { // Prisma unique constraint error
                res.status(400).send(err);
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
    }
    }

})


router.post("/login" , async(req , res)=>{
    const {email , password} = req.body;

        try{
                    const user = await prisma.user.findUnique({
                where : {
                    email : email
                }
            })
            
            // if user doesnt exists return error
                if(!user)return res.status(404).send({message : "User not found"})

            const isPasswordValid = bcrypt.compareSync(password , user.password);

            if(!isPasswordValid)return res.status(401).send({ message: "Invalid password" });

            // Then we have a successfull authentication
            const token = jwt.sign({id : user.id} , process.env.JWT_SECRET_KEY , {expiresIn: '24h'});
            res.json({
                    token : token ,
                    user : user
            });
         }
        catch(err){
                if (err.code === 'P2002') { // Prisma unique constraint error
                res.status(400).json({ message: 'Enter Valid Username or Email' });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        
    
})


export default router;