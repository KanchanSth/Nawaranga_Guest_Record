import mongoose from "mongoose";

const guestInfoSchema = new mongoose.Schema(
    {
        room_no: {
        type: String,
        required: true,
    },
        passport_no: {
        type: String,
        required: true,
    },
        name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    purpose_of_visit: {
        type: String,
        
    },
    }
)
export default mongoose.model("guests_record", guestInfoSchema)