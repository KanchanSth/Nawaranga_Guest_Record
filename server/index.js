
import express from "express"
import dotenv from 'dotenv'
import route from './routes/guestDataRoutes.js'
import cors from "cors"
import dbConnect from "./config/dbConnect.js"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dbConnect();

const app = express();
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 7000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/api",route);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);

app.listen(PORT,()=>{
                    console.log(`Server is running on port :: ${PORT}`)
                });