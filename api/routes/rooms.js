import express from "express"
import { verifyAdmin} from "../utils/verifiedToken.js";
import {
    createRoom,
    deleteRoom,
    getAllRooms,
    getRoom,
    updateRoom
} from "../controllers/roomControl.js";

const router = express.Router(); 

router.post("/:hotelid", verifyAdmin,createRoom);

//update
router.put("/:id", verifyAdmin,updateRoom);

//Read
router.get("/find/:id",getRoom);

//Read all
router.get("/",getAllRooms);

//Delete
router.delete("/:id/:hotelid", deleteRoom)

export default router;