import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal";

const TableData = ({ job }) => {
  const [open, setOpen] = useState(false);

  return (
    <tr className="text-center">
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
        {job.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
        {job.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
        {new Date(job.createdAt).toDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
        <button onClick={() => setOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          View Details
        </button>
        <JobDetailsModal open={open} setOpen={setOpen} job={job} />
      </td>
    </tr>
  );
};

export default TableData;
