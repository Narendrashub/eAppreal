import mongoose from "mongoose";

export async function dbConfig(){
    try{                
        let db=await mongoose.connect(process.env.MONGODB_URL)
        console.log(`db is connected on ${db.connection.host}`)
    
    }
    catch(error){
        console.log("error msg");
    }
    }
    