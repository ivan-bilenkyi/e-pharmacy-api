import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    products: { type: [productSchema], required: true }
});

export const Order = mongoose.model('Order', orderSchema);
