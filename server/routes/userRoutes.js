import express from "express"
import verifyToken from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

 const userRoutes = express.Router();


userRoutes.get("/admin", verifyToken,authorizeRoles("admin"), (req,res)=>{
    res.json({message:"Welcome Admin"});
})

userRoutes.get("/manager",verifyToken,authorizeRoles("admin","manager"), (req,res)=>{
    res.json({message:"Welcome Manager"});
})


userRoutes.get("/user",verifyToken,authorizeRoles("admin","manager","user"), (req,res)=>{
    res.json({message:"Welcome User"});
})

export default userRoutes