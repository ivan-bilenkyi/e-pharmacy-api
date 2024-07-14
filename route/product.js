import express from "express";
import {getProductById, getProducts, getProductsCategory} from "../controllers/products.js";
import {controllerWrapper} from "../helpers/controllerWrapper.js";

const router = express.Router();

router.get("/", controllerWrapper(getProducts));
router.get('/categories', controllerWrapper(getProductsCategory))
router.get('/:id', controllerWrapper(getProductById))

export default router;