import mongoose from "mongoose"


export const connect = async () => {
    try {
        const conn = await mongoose.Connect(process.env.MONGO_URI);
        console.log(`Mongoose Connected: ${conn.connection.host}`);

    } catch (error){

    }
}