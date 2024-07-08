import { Order } from "../db/order.js";
import { Products } from "../db/products.js";
import { User } from "../db/user.js";

export const addToCart = async (req, res, next) => {
    const user = req.user;
    const { productId, quantity } = req.body;

    const product = await Products.findById(productId);
    if (!product) {
        throw HttpError(404, "Product not found");
    }

    const cartItemIndex = user.cart.findIndex((item) =>
        item.productId.equals(productId)
    );
    if (cartItemIndex >= 0) {
        user.cart[cartItemIndex].quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
};

export const deleteCartById = async (req, res, next) => {
    const { id } = req.params;

    const user = req.user;
    user.cart = user.cart.filter((item) => item.productId.toString() !== id);

    await user.save();
    res.status(200).json(user.cart);
};

export const addToOrders = async (req, res, next) => {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(200).json("Order successfully added");
};
export const clearCart = async (req, res) => {
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, { cart: [] });

    res.status(200).json({ message: "Cart cleared successfully" });
};