import mongoose , { Schema } from "mongoose";


const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    }
})
export default mongoose.model("blogs",blogSchema)