import LoadContent from "@/components/Loader/LoadContent";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import JobTableData from "./JobTableData";

const MyJobs = () => {
  const session = useAxiosSecure();
  const { user } = useAuth();
  const { uid } = user || {};

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-jobs", uid],
    queryFn: async () => {
      const { data } = await session.get("/job/posted-jobs");
      return data.data;
    },
  });

  console.log("hello");

  if (isLoading) <LoadContent />;

  return (
    <div className="w-full lg:max-w-screen-xl mx-auto">
      <div className="mx-auto text-center mb-8">
        <h1 className="text-2xl font-medium text-gray-900 text-center">
          My Jobs
        </h1>
        <p className="text-gray-600">Here are all the jobs posted by you.</p>
      </div>

      <div className="mt-8 mx-auto overflow-x-scroll lg:overflow-auto">
        <table className="divide-y w-full divide-gray-200 mt-6 text-lg mx-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Image
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Job Title
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Category
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Posted On
              </th>
              <th className="px-6 py-4 whitespace-nowrap text-xs lg:text-base font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? data?.map((job) => (
              <JobTableData key={job._id} job={job} refetch={refetch} />
            )) : (
              <tr className="mt-2">
                <td colSpan="5" className="text-center">
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

export default MyJobs;
