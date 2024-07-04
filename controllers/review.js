import {Review} from "../db/review.js";


export const getAllReviews = async (req, res) => {
        const reviews = await Review.find();
        res.status(200).json(reviews);
}