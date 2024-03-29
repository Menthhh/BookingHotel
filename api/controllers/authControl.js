import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await newUser.save();
        res.status(201).json("User has been registered");
    }
    catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(400, "Username or password is wrong"));

        const isPasswordCorrect = bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password"));

        const token = jwt.sign({
            id: user._id,
            is_Admin: user.isAdmin
        }, process.env.SECRET_KEY);

        const { password, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ otherDetails });
    } catch (err) {
        next(err);
    }
}