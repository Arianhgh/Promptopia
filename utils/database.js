import mongoose from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "promptopia"
        });
        isConnected = true;
        console.log("Connected to database");
    }
    catch(err){
        console.log(err);
    }
};