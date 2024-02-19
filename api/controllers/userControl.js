import User from '../models/User.js';

export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try{
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }catch(err){
        next(err);
    }
}

export const updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}

//Read
export const getUser = async (req,res)=>{
    try{
        const User = await User.findById(req.params.id);
        res.status(200).json(User);
    }
    catch(err){
        next(err);
    }
}

//Read all
export const getAllUsers = async (req, res) => {
    try{
        const Users = await User.find();
        res.status(200).json(Users);
    }catch(err){
        next(err);
    }
}


//Delete
export const deleteUser = async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }
    catch(err){
        next(err);
    }
}
