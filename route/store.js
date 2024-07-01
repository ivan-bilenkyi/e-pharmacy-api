import express from "express";
import {getAllStores} from "../controlers/store.js";
import {controllerWrapper} from "../helpers/controllerWrapper.js";

const router = express.Router();

router.get("/", controllerWrapper(getAllStores));

export default router;