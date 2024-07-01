import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {login, logout, refreshUser, register} from '../controlers/auth.js';
import {controllerWrapper} from "../helpers/controllerWrapper.js";
import {authenticate} from "../middlewares/authenticate.js";
import {loginSchema, registerSchema} from "../models/user.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), controllerWrapper(register));
router.post("/login", validateBody(loginSchema), controllerWrapper(login))
router.get("/refresh", authenticate , controllerWrapper(refreshUser))
router.post("/logout", authenticate, logout);

export default router;