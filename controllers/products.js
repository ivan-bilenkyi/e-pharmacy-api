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
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const totalProducts = await Products.countDocuments(query);

    const products = await Products.find(query)
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum);
    const totalPages = Math.ceil(totalProducts / limitNum);
    res.status(200).json({ products, totalProducts, totalPages });
};
