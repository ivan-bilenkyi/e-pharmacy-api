import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpError } from '../helpers/HttpError.js';
import { User } from '../db/user.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email already in use")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        email,
        password: hashedPassword
    }

    const savedUser = await User.create(newUser);

    const payload = {
        id: savedUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });

    const userNew = await User.findByIdAndUpdate(savedUser._id,{
        dailyExerciseTime: 0,
        dailyCalorie: 0,
        token
    })

    res.status(201).json({
        token,
        user: {
            name: userNew.name,
            email: userNew.email,
        }
    })
}

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
        email,
    });
};

export const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.status(200).json({ message: 'Logout success' });
};
