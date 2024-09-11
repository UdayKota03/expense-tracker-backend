import mongoose from  "mongoose";

require("dotenv").config();;

const connectDB  = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("DB connected");
    }catch(err){
        console.log("Error connecting to DB" , err);
    }
}
export default connectDB;