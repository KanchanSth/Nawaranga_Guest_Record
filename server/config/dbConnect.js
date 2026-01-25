import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const dbConnect = async ()=> {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Database connected : ${connect.connection.host}, ${connect.connection.name}`)
    }
    catch(e){

        console.log(e);
        process.exit(1);

    }
    
};

export default dbConnect