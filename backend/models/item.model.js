import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User" 
    },
    bookUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'InActive'],
        required: true
    }
},{timestamps: true})

export const Item = mongoose.model("Item", itemSchema);

