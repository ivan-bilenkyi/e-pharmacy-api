import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';
import { User } from '../db/user.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body);

        const user = await User.findOne({ email });
        if (user) {
            throw new HttpError(409, "Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            phone,
            password: hashedPassword
        };

        const savedUser = await User.create(newUser);
        console.log(savedUser);

        const payload = {
            id: savedUser._id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
        console.log(token);

        const userNew = await User.findByIdAndUpdate(savedUser._id, {
            token
        }, { new: true });

        res.status(201).json({
            token,
            user: {
                name: userNew.name,
                email: userNew.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({ message: error.message });
    }
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
    const { _id, name, email, cart } = req.user;

    res.json({
        _id,
        name,
        email,
        cart
    });
};

export const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(200).json({ message: 'Logout success' });
};


