import { createProduct, createProducts, deleteProductById, getAllProducts, getProductById } from "../services/Product.js";
import { productAllowedUpdates } from "../utils/allowedUpdates.js";
import serverResponse from "../utils/serverResponse.js";


export const getAllProductsController = async (req, res) => {
    try {
        const products = await getAllProducts();
        return serverResponse(res, 200, products);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to get all products details"
        });
    }
};

// export const getAllProductsController = async (req, res) => {
//     const products = await getAllProducts();
//     if (products.length === 0) {
//         res.status(404).send("There ar no products in the database");
//         return;
//     }
//     res.status(200).send(products);
// }

export const getProductByIdController = async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
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

// export const getProductById = async (req, res) => {
//     const id = req.params.id;
//     const product = await Product.findOne({ _id: id });
//     if (!product) {
//         res.status(404).send("There is no product with the provided id");
//         return;
//     }
//     res.status(200).send(product);
// }

export const addProductController = async (req, res) => {
    try {
        const product = { ...req.body };
        if (Object.keys(product).length === 0) {
            res.status(400).send("Failed to add a product to the database - the request body doesn't contain an object");
            return;
        }
        const newProduct = await createProduct(product);
        return serverResponse(res, 201, newProduct);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to create product"
        });
    }
};

// export const addProduct = async (req, res) => {
//     try {
//         const obj = { ...req.body };
//         console.log(obj);
//         if (Object.keys(obj).length === 0) {
//             res.status(400).send("Failed to add a product to the database - the request body doesn't contain an object");
//             return;
//         }
//         const product = new Product(obj);
//         await product.save();
//         res.status(201).send(product);
//     } catch (e) {
//         console.log(e);
//         res.status(500).send({ message: e });
//     }
// }

export const addManyProductsController = async (req, res) => {
    try {
        const productsToAdd = req.body;
        if (!Array.isArray(productsToAdd) || productsToAdd.length === 0) {
            return serverResponse(res, 400, { message: "Failed to add a product to the database - the request body doesn't contain an array of objects"});
        }
        const addProducts = await createProducts(productsToAdd);
        return serverResponse(res, 201, addProducts);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to create products"
        });
    }
}

// export const addProduc = async (req, res) => {
//     try {
//         const productsArr = [...req.body]; // Assuming the array of objects is sent in the request body
//         // console.log(productsArr);
//         if (!Array.isArray(productsArr) || productsArr.length === 0) {
//             res.status(400).send("Failed to add a product to the database - the request body doesn't contain an array of objects");
//             return;
//         }
//         const addedProducts = await Product.insertMany(productsArr);
//         res.status(201).send(addedProducts);
//     } catch (e) {
//         console.log(e)
//         res.status(500).send({ message: e })
//     }
// }

export const deleteProductController = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await deleteProductById(id);
        if (!deletedProduct) {
            return serverResponse(res, 404, { message: "product doesn't exist" });
        }
        return serverResponse(res, 200, deletedProduct);
    } catch (e) {
        return serverResponse(res, 500, {
            message: "Internal error while trying to remove product"
        });
    }
};

// export const deleteProduct = async (req, res) => {
//     const id = req.params.id;
//     const deletedProduct = await Product.findOneAndDelete({ _id: id });
//     if (!deletedProduct) {
//         res.status(404).send({ message: `Product with id ${id} doesn't exist, so it can't be deleted` });
//         return;
//     }
//     res.status(200).send(deletedProduct);
// }

export const updateProductController = async (req, res) => {
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

// export const update = async (req, res) => {
//     const productAllowedUpdates = ["image", "price", "description", "rating"];
//     const updates = Object.keys(req.body);
//     let isValidOperation = updates.every((update) => productAllowedUpdates.includes(update));
//     if (updates.includes("rating")) {
//         const ratingAllowedUpdates = ["rate", "count"];
//         const ratingUpdates = Object.keys(req.body["rating"]);
//         isValidOperation = isValidOperation && ratingUpdates.every((update) => ratingAllowedUpdates.includes(update));
//     }

//     if (!isValidOperation) {
//         res.status(400).send({ message: "Invalid updates - you tried to update a key that doesn't exist" })
//         return;
//     }

//     try {
//         const id = req.params.id;
//         const product = await Product.findOne({ _id: id });
//         if (!product) {
//             res.status(404).send({ message: `Product with id ${id} doesn't exist` });
//             return;
//         }
//         updates.forEach((update) => (product[update] = req.body[update]));
//         await product.save();
//         res.status(200).send(product);
//     } catch (e) {
//         console.log("The update failed with error ", e);
//         res.status(500).send({ message: e });
//     }
// }