
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();


const verifyToken= (req,res,next)=>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization ;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
console.log(`The decoded user is: ${token}`);
        if(!token){
            return res.status(401).json({message:"No token, authorization denied"});
        }

        try {

            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.authUser = decode;
            console.log("The decoded user is:", req.authUser);
            //  res.status(200).json({message:` The token is : ${token} decoded user is: ${req.authUser}`});
            next(); 
            
        } catch (error) {
             res.status(400).json({message:"Invalid Token!!!"});
        }
    }

    else{
        return res.status(401).json({message:"No token, authorization denied"});
    }

}

export default verifyToken