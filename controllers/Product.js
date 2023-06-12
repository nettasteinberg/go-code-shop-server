import { createProduct, createProducts, deleteProductById, getAllProducts, getProductById } from "../services/Product";
import { productAllowedUpdates } from "../utils/allowedUpdates";
import serverResponse from "../utils/serverResponse";


export const getAllProductsDetails = async (req, res) => {
    try {
        const products = getAllProducts();
        return serverResponse(res, 200, products);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to get all products details"
        });
    }
};

export const getProductDetails = async (req, res) => {
    try {
        const product = await getProductById(req.params.productId);
        if (!product) {
            return serverResponse(res, 404, { message: "product doesn't exist" });
        }
        return serverResponse(res, 200, product);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to get product details"
        });
    }
};

export const addProduct = async (req, res) => {
    try {
        const product = { ...req.body };
        const newProduct = createProduct(product);
        return serverResponse(res, 201, newProduct);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to create product"
        });
    }
};

export const addProducts = async (req, res) => {
    try {
        const productsToAdd = req.body;
        if (!Array.isArray(productsToAdd) || productsToAdd.length === 0) {
            return serverResponse(res, 400, { message: "Failed to add a product to the database - the request body doesn't contain an array of objects"});
        }
        const products = await createProducts(productsToAdd);
        return serverResponse(res, 201, products);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to create products"
        });
    }
}

export const removeProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await getProductById(id);
        if (!product) {
            return serverResponse(res, 404, { message: "product doesn't exist" });
        }
        const deletedProduct = deleteProductById(id);
        return serverResponse(res, 200, deletedProduct);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to remove product"
        });
    }
};

export const updateProduct = async (req, res) => {
    const updates = Object.keys(req.body);
    let isValidOperation = updates.every((update) => productAllowedUpdates.includes(update));
    if (updates.includes("rating")) {
        const ratingUpdates = Object.keys(req.body["rating"]);
        isValidOperation = isValidOperation && ratingUpdates.every((update) => ratingAllowedUpdates.includes(update));
    }

    if (!isValidOperation) {
        return serverResponse(res, 400, { message: "Invalid updates - you tried to update a key that doesn't exist" })
    }

    try {
        const id = req.params.id;
        const product = await getProductById({ _id: id });
        if (!product) {
            serverResponse(res, 404, { message: `Invalid updates - product with id ${id} doesn't exist` });
        }
        updates.forEach((update) => (product[update] = req.body[update]));
        await product.save();
        return serverResponse(res, 200, product);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to update product"
        });
    }
}