const JobTableData = ({ job }) => {
  return (
    <tr className="text-center">
      <td className="px-6 py-4 whitespace-nowrap text-xs lg:text-base">
        <img
          src={job.image}
          alt={job.name}
          className="size-20 object-cover mx-auto"
        />
      </td>
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
        <div className="flex gap-4 justify-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-70">
            Update
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-70">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default JobTableData;
