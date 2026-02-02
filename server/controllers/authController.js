import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
 import jwt from "jsonwebtoken"
 import dotenv from "dotenv"
 dotenv.config();
 export  const register = async(req,res) =>{
  try{
      const {name, email, password, role} = req.body;

       const userExist = await User.findOne({email})
          if(userExist){
              return res.status(400).json({message: "User already exists"});
          }
   const hashedPassword = await bcrypt.hash(password, 9);

   const newUser = new User({name, email, password: hashedPassword, role});
   await newUser.save();
   res.status(201).json({message: `User registered with user name ${name}`})

  }
  catch(e){
    res.status(500).json({message: `Something went wrong`})
    console.log("e")
  }

 }
export const login = async(req,res) =>{
   try{
        const {email, password} = req.body;

     const user = await User.findOne({email})
console.log(`The user is: ${user}`); 
     if(!user){
      return res.status(404).json({message: `User not found`})
     }

     const isMatched = await bcrypt.compare(password, user.password)

     if(!isMatched){
      return  res.status(400).json({message: `Invalid Credentals`}) 
     }

     const token = jwt.sign({
        id: user._id, role: user.role
     }, process.env.JWT_SECRET,{expiresIn:"1hr"});

     res.status(200).json({token, message:`Welcome ${user.name}`})

   }

     catch(e){
        res.status(500).json({message: `Something went wrong`})
    console.log("e")
     }
 }

