import express from "express"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
} from "../controllers/userControl.js";

import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifiedToken.js";

const router = express.Router(); 

// router.get("/checkauthentication", verifyToken, (req, res) => {
//     res.send("You are authenticated");
// })

// router.get("/checkuser/:id", verifyUser, (req, res,next) => {
//     res.send("You are allowed to access and delete this user");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("You are an admin, and you can delete all users");
// });

//CRUD
//Create
router.post("/", verifyUser,createUser);

//update
router.put("/:id", verifyUser,updateUser);

//Read
router.get("/:id", verifyUser,getUser);

//Read all
router.get("/", verifyAdmin,getAllUsers);

//Delete
router.delete("/:id", verifyUser,deleteUser)

export default router;