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
        },
        count: {
            type: Number,
        },
    },
})

const Product = model("Product", productSchema);

module.exports = Product;