import express from "express";
import {getAllStores} from "../controlers/store.js";

const router = express.Router();

router.get("/", getAllStores);

export default router;