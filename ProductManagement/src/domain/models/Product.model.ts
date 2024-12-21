import mongoose, { model } from "mongoose";

const ProductStatusEnum = {
    Hold: "Hold",
    InStock: "InStock",
    Sold: "Sold",
    Loss: "Loss",
};
const dimensionsSchema = new mongoose.Schema({
    length: Number,
    breadth: Number,
    thickness: Number
})

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    description: { type: String, default: null },
    brandName: { type: String, default: null },
    status: {
        type: String,
        enum: Object.values(ProductStatusEnum),
        default: ProductStatusEnum.InStock
    },
    dimensions: {
        type: dimensionsSchema
    },
    price: { type: Number, required: true },
    featureImage: { type: String, required: false },
    texturedImage: { type: String, default: null },
    images: { type: [String], default: [] }, // Array of strings
    keywords: { type: [String], default: [] },
    branches: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: [] },
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Categories"
    }
})
export const Product = model("Product", ProductSchema) 