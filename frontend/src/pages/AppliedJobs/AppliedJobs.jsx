import LoadContent from "@/components/Loader/LoadContent";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import TableData from "./TableData";

const AppliedJobs = () => {
  const session = useAxiosSecure();
  const { user } = useAuth();
  const { uid } = user || {};

  const { data, isLoading } = useQuery({
    queryKey: ["applied-jobs", uid],
    queryFn: async () => {
      const { data } = await session.get("/job/applied-jobs");
      return data.data;
    },
  });

  console.log(data);

  if (isLoading)
    return (
      <div className="w-[95%] mx-auto lg:max-w-screen-xl min-h-svh">
        <LoadContent />
      </div>
    );

  return (
    <div className="w-[95%] mx-auto lg:max-w-screen-xl">
      <Helmet>
        <title>Bloom Hire | Applied Jobs</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold text-center mt-10">Applied Jobs</h1>
      </div>

      <div className="mt-8 mx-auto overflow-x-scroll lg:overflow-hidden">
        <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Job Title
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Category
              </th>

              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Job Published Date
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((job) => <TableData key={job._id} job={job} />)
            ) : (
              <tr className="mt-2">
                <td colSpan="4" className="text-center">
                  No Jobs Applied Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJobs;
