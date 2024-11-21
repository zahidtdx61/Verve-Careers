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

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, SecretsConfig.JWT_SECRET);
    req.body.uid = decoded.uid;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: "error",
      message: "Unauthorized",
    });
  }
};

const validateJobData = (req, res, next) => {
  const jobSchema = z.object({
    name: z.string().min(1),
    image: z.string().url(),
    description: z.string().min(1),
    category: z.string().min(1),
    salary: z.string().min(1),
    postedBy: z.string().min(1),
    applicationDeadline: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  });

  try {
    jobSchema.parse(req.body);
    next();
  } catch (error) {
    console.log('From middleware: ', error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid job data!",
      data: {},
      error: error.errors,
    });
  }
};

module.exports = {
  validateUserRegisterData,
  createJWT,
  verifyJWT,
  validateJobData,
};
