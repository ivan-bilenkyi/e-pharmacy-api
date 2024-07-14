import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

export const orderSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    paymentMethod: Joi.string().valid('Cash On Delivery', 'Bank').required(),
    products: Joi.array().items(productSchema).required()
});