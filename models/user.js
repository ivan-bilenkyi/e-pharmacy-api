const { Schema, model } = require('mongoose');
const Joi = require("joi");
const {handleMongooseError} = require('../middlewares');
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
    },
    { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    name: Joi.string().required(),
    phone: Joi.string().required(),
});

const schemas = {
    registerSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};