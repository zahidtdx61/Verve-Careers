const express = require('express');
const { UserController } = require('../../controllers');
const { validateUserRegisterData, createJWT } = require('../../middlewares');
const router = express.Router();

router.post("/register", validateUserRegisterData, createJWT, UserController.register);

module.exports = router;