import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const UserType = {
    Admin: "admin",
    Staff: "staff",
    Customer: "customer",
};
const coordinatesSchema = {
    lat: Number,
    lng: Number
}
const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        required: false
    },
    houseNumber: {
        type: String,

    },
    pincode: {
        type: String
    },
    coordinated: {
        type: coordinatesSchema,
        required: false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})
const organizationSchema = new mongoose.Schema({

})
const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userTypes: {
        type: [String],
        enum: Object.values(UserType),
        default: [UserType.Customer]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    address: {
        type: [addressSchema],
        required: false
    },
    selectedAddress: {
        type: addressSchema,
        required: false
    },
    organization: {
        type: organizationSchema,
        required: false
    },
}, {
    timestamps: true
})
UserScheme.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    }
    next();
})
export const User = model("User", UserScheme) 