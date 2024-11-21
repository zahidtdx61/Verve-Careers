const { JobController } = require("../../controllers");
const express = require("express");
const { verifyJWT, validateJobData, validateUpdateJobData } = require("../../middlewares");
const { jobDetails } = require("../../controllers/jobController");
const router = express.Router();

router.get("/all-jobs", JobController.allJobs);
router.post("/add-job", verifyJWT, validateJobData, JobController.addJob);
router.get("/job-details/:jobId", JobController.jobDetails);
router.get("/posted-jobs", verifyJWT, JobController.myPostedJobs);
router.post("/apply-job/:jobId", verifyJWT, JobController.applyJob);
router.get("/applied-jobs", verifyJWT, JobController.myAppliedJobs);
router.patch("/update-job/:jobId", verifyJWT, JobController.updateJob);
router.delete("/delete-job/:jobId", verifyJWT, JobController.deleteJob);

module.exports = router;
