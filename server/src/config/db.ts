import mongoose from "mongoose";
import { config } from "./env";

export const connectDatabase = async() => {
    try{
        return await mongoose.connect(config.MONGO_URI);
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}