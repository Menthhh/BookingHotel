import express from "express"
import {
    createHotel,
    deleteHotel,
    getAllHotels,
    getHotel,
    updateHotel,
    countByCities,
    countByType
} from "../controllers/hotelControl.js";
import { verifyAdmin } from "../utils/verifiedToken.js";

const router = express.Router(); 

//CRUD
//Create
router.post("/", verifyAdmin,createHotel);

//update
router.put("/:id", verifyAdmin,updateHotel);

//Read
router.get("/find/:id",getHotel);
router.get("/",getAllHotels);
router.get("/countByCities",countByCities);
router.get("/countByType",countByType);

//Delete
router.delete("/:id", deleteHotel)

export default router;