import mongoose from "mongoose";


export const connectDatabase = async() => {
    try{
        const key = process.env.MONGODB_KEY;
        if(!key)throw new Error('Missing Database Key.');
        return await mongoose.connect(key);
    }catch(e){
        console.error(e);
        process.exit(1);
    }
}