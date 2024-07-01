import express from "express";
import {getAllReviews} from "../controlers/review.js";

const router = express.Router();

router.get("/", getAllReviews);

export default router;