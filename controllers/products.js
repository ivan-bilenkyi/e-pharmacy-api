import { Products } from "../db/products.js";

export const getProducts = async (req, res) => {
    const { category, keyword, limit = 12, page = 1 } = req.query;
    let query = {};


    if (category && category.trim() !== "") {
        query.category = category;
    }

    if (keyword && keyword.trim() !== "") {
        query.name = { $regex: keyword, $options: "i" };
    }

    const totalProducts = await Products.countDocuments(query);
    const allProducts = await Products.find();
    const categories = [...new Set(allProducts.map((item) => item.category))];

    const products = await Products.find(query)
        .limit(limit)
        .skip((page - 1) * limit);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ products, totalProducts, totalPages, categories });
};
