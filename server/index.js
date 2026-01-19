
import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import route from './routes/guestDataRoutes.js'
import cors from "cors"

const app = express();
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

console.log('Registering /api routes...');

app.use("/api",route);


mongoose
        .connect(MONGOURL)
        .then(
            ()=>{
                console.log("DB Connected Successfully!!!")
                app.listen(PORT,()=>{
                    console.log(`Server is running on port :: ${PORT}`)
                });
            }
        ).catch((e)=>{console.log(e)});

