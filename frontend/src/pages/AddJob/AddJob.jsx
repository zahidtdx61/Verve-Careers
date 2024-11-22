import LoadContent from "@/components/Loader/LoadContent";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddJob = () => {
  const { register, handleSubmit } = useForm();
  const session = useAxiosSecure();
  const { user, isLoading, setIsLoading } = useAuth();
  const [applicationDeadline, setApplicationDeadline] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState(null);
  const [categoryError, setCategoryError] = useState(false);

  const options = [
    { value: "On-site Job", label: "On-site Job" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote-Job", label: "Remote-Job" },
    { value: "Part-time Job", label: "Part-time Job" },
  ];

  const submitData = async (data) => {
    setCategoryError(false);
    // console.log(data);
    if (selectedOption === null) {
      setCategoryError(true);
      return;
    }

    data.category = selectedOption;
    data.postedBy = user.uid;
    data.applicationDeadline = applicationDeadline;
    console.log(data);
    try {
      setIsLoading(true);
      const resp = await session.post("/job/add-job", data);
      toast.success("New Job added successfully");
      console.log(resp);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error("Failed to add new Job");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <>
        <LoadContent />
      </>
    );

  return (
    <div className="w-full mx-auto mt-4">
      <div className="w-fit mx-auto px-2 tracking-tight border-primary-green  text-center font-mulish font-semibold text-2xl text-primary-teal border-b-2">
        Add a new Job
      </div>

      <form
        onSubmit={handleSubmit(submitData)}
        className="space-y-5 max-w-screen-lg p-4 mx-auto"
      >
        <div>
          <label className="font-medium">Job Title </label>
          <input
            type="text"
            {...register("name")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Name"
          />
        </div>

        <div>
          <label className="font-medium">Image Url for Job</label>
          <input
            type="text"
            {...register("image")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Image Url"
          />
        </div>

        <div>
          <label className="font-medium">Job Description</label>
          <textarea
            {...register("description")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Description"
          />
        </div>

        <div>
          <label className="font-medium">Category</label>
          <Select
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            defaultValue={selectedOption}
            onChange={({ value }) => setSelectedOption(value)}
            options={options}
          />
          {categoryError && <p className="text-red-500">Please select a tag</p>}
        </div>

        <div>
          <label className="font-medium">Salary</label>
          <input
            type="text"
            {...register("salary")}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            placeholder="Enter Medicine Type"
          />
        </div>

        <div>
          <label className="font-medium block">Application Deadline</label>
          <DatePicker
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
            selected={applicationDeadline}
            onChange={(date) => setApplicationDeadline(date)}
          />
        </div>

        <div className="mx-auto w-fit mt-8">
          <button className="w-full  text-white bg-blue-500 rounded-lg py-2 md:w-52 ">
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
