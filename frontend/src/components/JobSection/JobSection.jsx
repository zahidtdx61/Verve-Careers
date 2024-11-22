import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import LoadContent from "../Loader/LoadContent";
import JobCard from "./JobCard";

const JobSection = () => {
  const [category, setCategory] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const session = useAxiosSecure();

  const categories = [
    "",
    "On-site Job",
    "Remote-Job",
    "Hybrid",
    "Part-time Job",
  ];

  const { data: jobs, isLoading: jobsLoading } = useQuery({
    queryKey: ["jobs", category],
    queryFn: async () => {
      const response = await session.get(`/job/all-jobs?category=${category}`);
      return response.data.data;
    },
  });

  if (jobsLoading) return <LoadContent />;

  const manageTabs = (index) => {
    setCategory(categories[index]);
    setTabIndex(index);
  };

  // console.log(jobs);
  return (
    <div className="w-[95%] max-w-screen-xl mx-auto">
      <div className="mx-auto text-center mb-4">
        <h1 className="text-3xl font-medium text-gray-900 text-center border-b-2 w-fit mx-auto pb-1 px-2">
          Job Section
        </h1>
      </div>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => manageTabs(index)}>
        <TabList>
          {categories.map((cat, index) => (
            <Tab key={index}>{cat || "All Jobs"}</Tab>
          ))}
        </TabList>
        {categories.map((cat, index) => (
          <TabPanel key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default JobSection;
