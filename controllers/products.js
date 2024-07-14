import { Products } from "../db/products.js";
import {HttpError} from "../helpers/HttpError.js";

export const getProducts = async (req, res, nex) => {
    const { category, keyword } = req.query;
    let query = {};

    if (category && category.trim() !== "") {
        query.category = category;
    }

    if (keyword && keyword.trim() !== "") {
        query.name = { $regex: keyword, $options: "i" };
    }
    const products = await Products.find(query)

    res.status(200).json({ products });
};

export const getProductsCategory = async (req, res) => {
    const products = await Products.find();
    const categoryArray = [...new Set(products.map((item) => item.category))];
    res.status(200).json(categoryArray);
};

export const getProductById = async (req, res) => {
    const { id } = req.query
    const product = await Products.findById(id)

    res.status(200).json(product);
}
