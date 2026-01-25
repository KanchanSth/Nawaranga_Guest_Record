import express from "express"
import {create,getAllGuestInfo,getGuestInfoById,updateGuestData,deleteGuestInfo} from "../controllers/guestDataController.js"
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const route = express.Router();

route.post("/guestInfo",create);
route.get("/guestsInfo",getAllGuestInfo);
route.get("/guest/:id",getGuestInfoById);
route.put("/update/guest/:id",updateGuestData);
route.delete("/delete/guest/:id",authorizeRoles("admin"),deleteGuestInfo);

export default route;