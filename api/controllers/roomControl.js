import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError }  from  "../utils/error.js";

export const createRoom = async (req, res, next)  =>{
    const hotelid = req.params.hotelid;
    const newRoom = new Room(req.body);

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelid,{$push: {rooms: savedRoom._id}});
        }catch(err){
            next(err);
        }
        res.status(200).json(savedRoom);    
    }catch(err){
        next(err);
    }
};


export const updateRoom = async (req, res) => {
    try{
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedRoom);
    }catch(err){
        next(err);
    }
}

//Read
export const getRoom = async (req,res)=>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(err){
        next(err);
    }
}

//Read all
export const getAllRooms = async (req, res) => {
    try{
        const rooms = await Hotel.find();
        
        res.status(200).json(rooms);
    }catch(err){
        next(err);
    }
}


//Delete
export const deleteRoom = async (req,res)=>{
    try{
        const hotelid = req.params.hotelid;
        try{
            await Hotel.findByIdAndUpdate(hotelid,{
                $pull: {rooms: req.params.id}
            });
        }catch(err){
            next(err);
        }
        await Room.findByIdAndDelete(req.params.id);
        res.status(200).json("Room has been deleted");
    }
    catch(err){
        next(err);
    }
}

export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
       
