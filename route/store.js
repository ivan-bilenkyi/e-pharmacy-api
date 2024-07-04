import express from "express";
import {getAllStores, getRandomStores} from "../controllers/store.js";
import {controllerWrapper} from "../helpers/controllerWrapper.js";
import {authenticate} from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, controllerWrapper(getAllStores))
router.get("/nearest", controllerWrapper(getRandomStores));

export default router;