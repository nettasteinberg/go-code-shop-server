import Product from "../models/Product.js"

export const getAllProducts = () => {
    return Product.find({});
};

export const getProductById = (productId) => {
    return Product.findOne({ _id: id });
};

export const createProduct = (product) => {
    const newProduct = new Product(product);
    return newProduct.save();
};

export const createProducts = (productsArray) => {
    return Product.insertMany(productsArray);
}

export const deleteProductById = (productId) => {
    return Product.findOneAndDelete( { _id: productId });
};