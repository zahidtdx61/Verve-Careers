const { JobController } = require("../../controllers");
const express = require("express");
const { verifyJWT, validateJobData } = require("../../middlewares");
const { jobDetails } = require("../../controllers/jobController");
const router = express.Router();

router.get("/all-jobs", JobController.allJobs);
router.post("/add-job", verifyJWT, validateJobData, JobController.addJob);
router.get("/job-details/:jobId", verifyJWT, JobController.jobDetails);
router.get("/posted-jobs", verifyJWT, JobController.myPostedJobs);
router.post("/apply-job/:jobId", verifyJWT, JobController.applyJob);

module.exports = router;
