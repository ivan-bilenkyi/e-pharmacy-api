import { v4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { HttpError } from '../helpers/HttpError.js'
import {User} from "../db/user.js";

export const register = async (req, res) => {
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
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    });
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email is wrong")
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw HttpError(401, "Password is wrong")
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    })
}

export const refreshUser = async (req, res) => {
    const { _id, name, email } = req.user;

    res.json({
        _id,
        name,
        email
    })
}

export const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(200).json({ message: "Logout success" });
}
