import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Job = () => {
  const session = useAxiosSecure();
  const { id } = useParams();

  const {
    data: job,
    isLoading: jobLoading,
    error: jobError,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const response = await session.get(`/job/job-details/${id}`);
      return response.data.data;
    },
  });

  console.log(job);
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Job;
