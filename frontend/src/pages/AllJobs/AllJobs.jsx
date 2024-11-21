import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllJobs = () => {
  const session = useAxiosSecure();

  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const response = await session("/job/all-jobs");
      return response.data.data;
    },
  });

  console.log(jobs);

  return (
    <div className="w-full lg:max-w-screen-xl mx-auto">
      <div className="mx-auto text-center mb-8">
        <h1 className="text-2xl font-medium text-gray-900 text-center">
          All Jobs
        </h1>
        <p className="text-gray-600">Here are all the jobs we have available</p>
      </div>

      {jobsLoading ? (
        <p>Loading...</p>
      ) : jobsError ? (
        <p>Error: {jobsError.message}</p>
      ) : (
        <Table className="max-w-screen-lg mx-auto ">
          <TableCaption>A list of all available jobs.</TableCaption>
          <TableHeader>
            <TableRow className="text-lg">
              <TableHead>Job Title</TableHead>
              <TableHead>Job Posting Date</TableHead>
              <TableHead>Application Deadline</TableHead>
              <TableHead>Expected Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>{new Date(job.createdAt).toDateString()}</TableCell>
                <TableCell>
                  {new Date(job.applicationDeadline).toDateString()}
                </TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>
                  <Button to={`/job/${job._id}`} variant="outline">
                    View Job
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AllJobs;
