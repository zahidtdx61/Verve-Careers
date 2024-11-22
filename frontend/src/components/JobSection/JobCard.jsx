import { Link } from "react-router-dom";
import noFoundImage from "/404.jpg";

const JobCard = ({ job }) => {
  return (
    <div className="w-full flex flex-col shadow-lg p-4 rounded-lg">
      <div className="h-[200px]">
        <img
          src={job.image || noFoundImage}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="p-2 flex-1">
        <h1 className="text-lg font-semibold">{job.name}</h1>
        <p className="text-sm text-gray-500">{job.description}</p>
        <p className="text-sm text-gray-500">Salary: {job.salary}</p>
        <p className="text-sm text-gray-500">Category: {job.category}</p>
        <p className="text-sm text-gray-500">
          Deadline: {new Date(job.applicationDeadline).toDateString()}
        </p>
      </div>

      <Link to={`/job/${job._id}`} className="flex justify-end">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-2 w-fit hover:opacity-75">
          Veiw Details
        </button>
      </Link>
    </div>
  );
};

export default JobCard;
