import mongoose, { model } from "mongoose";

const customerSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true,
    },
    lastName:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address']
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    membershipId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Membership",
        required: [true, 'Membership is required']
    }


})
const Customer= model('Customer',customerSchema);
export default Customer;