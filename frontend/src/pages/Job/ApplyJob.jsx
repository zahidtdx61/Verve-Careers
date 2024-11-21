import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";
import toast from "react-hot-toast";

const ApplyJob = ({ open, setOpen, job, refetch }) => {
  const session = useAxiosSecure();

  const applyJob = async () => {
    try {
      await session.post(`/job/apply-job/${job._id}`);
      setOpen(false);
      refetch();
      toast.success("Applied for the job successfully");
    } catch (error) {
      toast.error("Failed to apply for the job");
      console.error(error);
      setOpen(false);
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 500, borderRadius: "md", p: 3, boxShadow: "lg" }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: "lg", mb: 1 }}
        >
          Are you sure you want to apply for this job?
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          You are applying for the job posted by{" "}
          <span className="font-medium">{job.postedBy.name}</span>. You can't
          undo this action.
        </Typography>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setOpen(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => applyJob()}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Apply
          </button>
        </div>
      </Sheet>
    </Modal>
  );
};

export default ApplyJob;
