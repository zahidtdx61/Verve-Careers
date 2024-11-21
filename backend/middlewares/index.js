const { StatusCodes } = require("http-status-codes");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { SecretsConfig } = require("../configs");

const validateUserRegisterData = (req, res, next) => {
  const userRegisterSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    uid: z.string().min(1),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

  try {
    userRegisterSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid user data!",
      data: {},
      error: error.errors,
    });
  }
};

const createJWT = (req, res, next) => {
  const { uid } = req.body;
  const token = jwt.sign({ uid }, SecretsConfig.JWT_SECRET, {
    expiresIn: "365d",
  });
  req.body.token = token;
  next();
};

module.exports = {
  validateUserRegisterData,
  createJWT,
};
