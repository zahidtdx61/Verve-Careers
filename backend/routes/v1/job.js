const { JobController } = require("../../controllers");
const express = require("express");
const { verifyJWT, validateJobData } = require("../../middlewares");
const router = express.Router();

router.post("/add-job", verifyJWT, validateJobData, JobController.addJob);

module.exports = router;
