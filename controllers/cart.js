import { Order } from "../db/order.js";
import { Products } from "../db/products.js";
import { User } from "../db/user.js";
import {HttpError} from "../helpers/HttpError.js";

export const updateCart = async (req, res, next) => {
    try {
        const user = req.user;
        const { productId, quantity } = req.body;

        const product = await Products.findById(productId);
        if (!product) {
            throw HttpError(404, "Product not found");
        }

        const cartItemIndex = user.cart.findIndex((item) =>
            item.productId.equals(productId)
        );
        if (cartItemIndex >= 0 && quantity >= 1) {
            user.cart[cartItemIndex].quantity += quantity;
        } else if (cartItemIndex >= 0 && quantity === -1) {
            user.cart[cartItemIndex].quantity --;
        } else if (!quantity){
            user.cart.splice(cartItemIndex, 1)
        }
        else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        next(error);
    }
};


export const addToOrders = async (req, res, next) => {
    const { cart } = req.body;

    // Зберігаємо нове замовлення
    const newOrder = new Order(req.body);
    await newOrder.save();

    req.user.cart = [];

    await req.user.save();

    res.status(200).json("Order successfully added");
};

export const getShoppingCarts = async (req, res) => {
    const { cart } = req.user;

    const productIds = cart.map(obj => obj.productId);

    const products = await Products.find({ _id: { $in: productIds } });

    const resultArray = products.map(product => {
        const initialObj = cart.find(obj => obj.productId.equals(product._id));
        return {
            id: product._id,
            quantity: initialObj.quantity,
            name: product.name,
            price: product.price,
            photo: product.photo,
            suppliers: product.suppliers,
            stock: product.stock,
            category: product.category
        };
    });
    res.status(200).json(resultArray);
}