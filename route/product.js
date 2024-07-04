import express from "express";
import { getProducts } from "../controllers/products.js";
import {authenticate} from "../middlewares/authenticate.js";
import {controllerWrapper} from "../helpers/controllerWrapper.js";

const router = express.Router();

router.get("/", authenticate, controllerWrapper(getProducts));

export default router;