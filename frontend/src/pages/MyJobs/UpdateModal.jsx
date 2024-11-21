import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateModal = ({ open, setOpen, job, refetch }) => {
  const { register, handleSubmit } = useForm();
  const session = useAxiosSecure();
  const { user, isLoading, setIsLoading } = useAuth();
  const [applicationDeadline, setApplicationDeadline] = useState(
    new Date(job.applicationDeadline)
  );

  const submitData = async (data) => {
    data.applicationDeadline = applicationDeadline;
    console.log(data);

    if (
      data.name === job.name &&
      data.image === job.image &&
      data.description === job.description &&
      data.category === job.category &&
      data.salary === job.salary &&
      new Date(job.applicationDeadline).toJSON() ===
        new Date(data.applicationDeadline).toJSON()
    ) {
      toast.error("No changes made to the job");
      return;
    }

    setOpen(false);

    try {
      setIsLoading(true);
      const resp = await session.patch(`/job/update-job/${job._id}`, data);
      toast.success("Job updated successfully");
      console.log(resp);
      setIsLoading(false);
      refetch();
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      toast.error("Failed to update Job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "scroll",
        maxHeight: "100vh",
        margin: "auto",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose variant="plain" sx={{ m: 1, mt: 4 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1, mt: 4 }}
        >
          Are you sure you want to apply for this job?
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          You are applying for the job posted by{" "}
          <span className="font-medium">{}</span>. You can't undo this action.
        </Typography>

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
              defaultValue={job.name}
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
              defaultValue={job.image}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              placeholder="Enter Image Url"
            />
          </div>

          <div>
            <label className="font-medium">Job Description</label>
            <textarea
              {...register("description")}
              required
              defaultValue={job.description}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              placeholder="Enter Medicine Description"
            />
          </div>

          <div>
            <label className="font-medium">Category</label>
            <input
              type="text"
              {...register("category")}
              required
              defaultValue={job.category}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-600 shadow-sm rounded-lg"
              placeholder="Enter Company Name"
            />
          </div>

          <div>
            <label className="font-medium">Salary</label>
            <input
              type="text"
              {...register("salary")}
              required
              defaultValue={job.salary}
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
            <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">
              Update Job
            </button>
          </div>
        </form>
      </Sheet>
    </Modal>
  );
};

export default UpdateModal;
