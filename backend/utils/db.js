import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONOGO_URL)
        console.log("monogo db connected");
        
    } catch (error) {
        console.log(error)
    }
}