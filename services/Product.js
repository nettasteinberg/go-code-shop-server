import { Product } from "../models/Product.js"

export const getAllProducts = () => {
    return Product.find({});
};

export const getProductById = (id) => {
    return Product.findOne({ _id: id });
};

export const createProduct = async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    return newProduct;
};

export const createProducts = (productsArray) => {
    return Product.insertMany(productsArray);
}

export const deleteProductById = (id) => {
    return Product.findOneAndDelete( { _id: id });
};