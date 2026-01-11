import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI;

if(!MONGODB_URI){
    throw new Error("please define the Mongodb uri env variable ")
}
let cached=global.mongoose;
if(!cached){
    cached=global.mongoose={conn:null, promise:null}
}

async function dbConnect(){
    if(cached.conn){
        console.log("mongo db is already connect ")
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(MONGODB_URI).then((mongoose)=>{
            return mongoose;
        })
    }
    try{
   cached.conn=await cached.promise
   console.log("db connect successfully ")
    }
    catch(error){
cached.promise=null
throw error
    }
    return cached;
}
export default dbConnect