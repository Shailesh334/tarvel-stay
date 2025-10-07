import jwt from 'jsonwebtoken';


const authMiddleware = (req , res , next)=>{
    const token = req.headers['authorization'];
    console.log("token in authMiddleWare" , token);
    if(!token)res.status(401).json({message : "No Token Provided"});

    try{
        jwt.verify(token , process.env.JWT_SECRET_KEY , (err , decoded)=>{
            if(err)res.status(401).json({message : "Invalid Token"});
            req.userId = decoded.id;
            next();
        })
    }
    catch(err){
        console.log(err);
    }


}



export default authMiddleware;