import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ApplyJob from "./ApplyJob";

const Job = () => {
  const { user } = useAuth();
  const { uid } = user || {};
  const session = useAxiosSecure();
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const {
    data: job,
    isLoading: jobLoading,
    error: jobError,
    refetch,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await session.get(`/job/job-details/${id}`);
      return response.data.data;
    },
  });

  const checkApplied = () => {
    if (job.applicants.map((applicant) => applicant.uid).includes(uid)) {
      return true;
    }
    return false;
  };

  if (jobLoading) return <p>Loading...</p>;

  return (
    <div className="w-[90%] lg:max-w-screen-xl mx-auto">
      <div>
        <div className="h-[500px]">
          <img
            className="w-full h-full object-cover object-center"
            src={job.image}
            alt="Job"
          />
        </div>

        <div className="flex justify-between flex-col lg:flex-row mt-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">{job.name}</h1>
            <p className="text-gray-600">
              Posted on {new Date(job.createdAt).toDateString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Category: {job.category}</p>
            <p className="text-gray-600">Posted By: {job.postedBy.name}</p>
          </div>
        </div>

        <div className="mt-8">
          <p>{job.description}</p>
          <p className="mt-4">Expected Salary: {job.salary}</p>
          <p>
            Application Deadline:{" "}
            {new Date(job.applicationDeadline).toDateString()}
          </p>
          <p>Category: {job.category}</p>
          <p>Posted By: {job.postedBy.name}</p>
          <p>Applied By: {job.totalApplicants} people</p>
        </div>

        <div className="mt-8">
          {checkApplied() ? (
            <button
              disabled
              className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              You have already applied for this job
            </button>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Apply Now
            </button>
          )}

          <ApplyJob open={open} setOpen={setOpen} job={job} refetch={refetch} />
        </div>
      </div>
    </div>
  );
};

export default Job;
