const { StatusCodes } = require("http-status-codes");
const Job = require("../models/job");
const User = require("../models/user");

const addJob = async (req, res) => {
  const job = req.body;
  try {
    const jobPoster = await User.findOne({ uid: job.postedBy });

    if (!jobPoster) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid job poster!",
        data: {},
        error: "Invalid job poster!",
      });
    }
    job.postedBy = jobPoster._id;

    const newJob = await Job.create(job);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid job data!",
      data: {},
      error: error.errors,
    });
  }
};

const allJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "All jobs fetched successfully",
      data: jobs,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error fetching jobs!",
      data: {},
      error: error.errors,
    });
  }
};

const jobDetails = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId).populate("postedBy").populate("applicants");
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Job details fetched successfully",
      data: job,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error fetching job details!",
      data: {},
      error: error.errors,
    });
  }
};

const myPostedJobs = async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user!",
        data: {},
        error: "Invalid user!",
      });
    }

    const jobs = await Job.find({ postedBy: user._id });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "My posted jobs fetched successfully",
      data: jobs,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error fetching my posted jobs!",
      data: {},
      error: error.errors,
    });
  }
};

const applyJob = async (req, res) => {
  const { uid } = req.body;
  const { jobId } = req.params;
  
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user!",
        data: {},
        error: "Invalid user!",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid job!",
        data: {},
        error: "Invalid job!",
      });
    }

    if (job.postedBy.toString() === user._id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You cannot apply for your own job!",
        data: {},
        error: "You cannot apply for your own job!",
      });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You have already applied for this job!",
        data: {},
        error: "You have already applied for this job!",
      });
    }

    job.applicants.push(user._id);
    job.totalApplicants += 1;
    await job.save();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Job applied successfully",
      data: job,
      error: {},
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error applying for job!",
      data: {},
      error: error.errors,
    });
  }
};

const myAppliedJobs = async (req, res) => {
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user!",
        data: {},
        error: "Invalid user!",
      });
    }

    const jobs = await Job.find({ applicants: user._id });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "My applied jobs fetched successfully",
      data: jobs,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error fetching my applied jobs!",
      data: {},
      error: error.errors,
    });
  }
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const jobData = req.body;
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user!",
        data: {},
        error: "Invalid user!",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid job!",
        data: {},
        error: "Invalid job!",
      });
    }

    if (job.postedBy.toString() !== user._id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You cannot update this job!",
        data: {},
        error: "You cannot update this job!",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, jobData);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
      error: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error updating job!",
      data: {},
      error: error.errors,
    });
  }
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const { uid } = req.body;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid user!",
        data: {},
        error: "Invalid user!",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid job!",
        data: {},
        error: "Invalid job!",
      });
    }

    if (job.postedBy.toString() !== user._id.toString()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "You cannot delete this job!",
        data: {},
        error: "You cannot delete this job!",
      });
    }

    await Job.findByIdAndDelete(jobId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Job deleted successfully",
      data: {},
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Error deleting job!",
      data: {},
      error: error.errors,
    });
  }
};

module.exports = {
  addJob,
  allJobs,
  jobDetails,
  myPostedJobs,
  applyJob,
  myAppliedJobs,
  updateJob,
  deleteJob,
};
