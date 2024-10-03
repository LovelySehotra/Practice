import mongoose from "mongoose";
const dbconnect=async()=>{
    try {
        const {connection} =await mongoose.connect(
            'mongodb://127.0.0.1:27017/lms'
        )
        if(connection){
            console.log('Connected')
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export default dbconnect;