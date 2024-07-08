import { Schema, model } from 'mongoose'
import {handleMongooseError} from "../middlewares/handleMongooseError.js";

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: [true, "Set password for user"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            match: emailRegex,
            unique: true,
        },
        name: {
            type: String,
            required: true
        },
        phone : {
            type: String,
            required: true
        },
        token: {
            type: String,
            default: "",
        },
        cart: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
            },
        ],
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
