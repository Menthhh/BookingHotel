import express from 'express';
import connect from "./db.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const PORT = 8800;
const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use((err,req,res,next)=>{
    res.status(500).json({
        success: false,
        message: err.message,
        status: err.status,
    });
})



app.listen(PORT, () => {
    connect();
    console.log(`Server is running on port #${PORT}`);
});