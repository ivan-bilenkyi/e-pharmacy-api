const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { HttpError, controllerWrapper } = require("../helpers");
const { User } = require("../models/user");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const verificationToken = v4();

    const newUser = new User({
        ...req.body,
        password: hashedPassword,
        verificationToken: verificationToken,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "12h",
    });

    res.status(201).json({
        token,
        // user: {
        //     email: newUser.email,
        //     name: newUser.name,
        //     phone: newUser.phone,
        // },
    });
};

module.exports = {
    register: controllerWrapper(register),
};