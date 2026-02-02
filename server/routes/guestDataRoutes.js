import express from "express"
import {create,getAllGuestInfo,getGuestInfoById,updateGuestData,deleteGuestInfo} from "../controllers/guestDataController.js"
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import verifyToken from "../middlewares/authMiddleware.js";


const route = express.Router();

route.post("/guestInfo",verifyToken,authorizeRoles("admin","manager","user"), create);
route.get("/guestsInfo",verifyToken,authorizeRoles("admin","manager","user"),getAllGuestInfo);
// route.get("/guest/:id",verifyToken,authorizeRoles("admin","manager","user"),getGuestInfoById);
route.put("/update/guest/:id",verifyToken,authorizeRoles("admin","manager","user"), updateGuestData);
route.delete("/delete/guest/:id",verifyToken, authorizeRoles("admin"),deleteGuestInfo);

export default route;