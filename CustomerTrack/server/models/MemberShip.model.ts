import mongoose, { model } from "mongoose";
const membershipSchema= new mongoose.Schema({
        name: {
            type: String,
            required: true,
            enum: ['Gold', 'Diamond'],
        }
});
const Membership = model('Membership',membershipSchema);
export default Membership;