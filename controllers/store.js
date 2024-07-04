import {HttpError} from "../helpers/HttpError.js";
import {Store} from "../db/store.js";

export const getRandomStores = async (req, res) => {
    const stores = await Store.aggregate([{ $sample: { size: 6 } }]);
    res.status(200).json(stores);
};

export const getAllStores = async (req, res) => {
    const stores = await Store.find()
    res.status(200).json(stores);
}