import express from "express";
import {
    addToCart,
    addToOrders,
    clearCart,
    deleteCartById,
} from "../controllers/cart.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/");
router.put("/update", authenticate, addToCart);
router.delete("/delete/:id", authenticate, deleteCartById);
router.post("/checkout", authenticate, addToOrders);
router.post("/clear-cart", authenticate, clearCart);
export default router;