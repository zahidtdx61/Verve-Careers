import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from "@mui/joy";
import toast from "react-hot-toast";
import { MdWarning } from "react-icons/md";

const DeleteModal = ({ open, setOpen, refetch, jobId }) => {
  const session = useAxiosSecure();
  const { setIsLoading } = useAuth();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await session.delete(`/job/delete-job/${jobId}`);
      setIsLoading(false);
      setOpen(false);
      toast.success("Job deleted successfully");
      refetch();
    } catch (error) {
      setIsLoading(false);
      setOpen(false);
      toast.error("Failed to delete job");
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <MdWarning />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>Are you sure you want to delete this job?</DialogContent>
        <DialogActions>
          <Button onClick={() => handleDelete()} variant="solid" color="danger">
            Delete
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteModal;
