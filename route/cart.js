import express from "express";
import {
    addToOrders, getShoppingCarts, updateCart,
} from "../controllers/cart.js";
import {authenticate} from "../middlewares/authenticate.js";
import {validateBody} from "../middlewares/validateBody.js";
import {orderSchema} from "../models/orders.js";

const router = express.Router();

router.get("/", authenticate, getShoppingCarts);
router.put("/update", authenticate, updateCart);
router.post("/checkout", authenticate, validateBody(orderSchema), addToOrders);
export default router;