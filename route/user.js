const express = require('express');
const validateBody = require('../middlewares/validateBody');
const { schemas } = require('../models/user')
const { register } = require("../controlers/auth");

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(schemas.registerSchema), register);

module.exports = usersRouter;