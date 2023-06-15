import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    rating: {
        rate: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
    },
})

export const Product = model("Product", productSchema); 