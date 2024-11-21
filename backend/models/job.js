const { Mongoose } = require("../configs");

const jobSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  applicants: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  totalApplicants: {
    type: Number,
    default: 0,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Job = Mongoose.model("Job", jobSchema);

module.exports = Job;
