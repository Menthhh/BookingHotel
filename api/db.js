import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () =>{
    console.log("Disconnected from MongoDB");
});
mongoose.connection.on("connected", (error) =>{
    console.log("connected to MongoDB");
});

export default connect;