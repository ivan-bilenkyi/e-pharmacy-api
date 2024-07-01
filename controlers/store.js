import {HttpError} from "../helpers/HttpError.js";
import {Store} from "../db/store.js";

export const getAllStores = async (req, res) => {
    try {
        const stores = await Store.aggregate([{ $sample: { size: 6 } }]);
        res.status(200).json(stores);
    } catch (error) {
        res.status(404).json(HttpError(404, "Stores not found"));
    }
};