import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";

const JobDetailsModal = ({ open, setOpen, job }) => {
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
          Job Details
        </Typography>
        <div className="h-[250px]">
          <img src={job.image} alt="" />
        </div>

        <div>
          <div>{job.name}</div>
          <Typography textColor="text.tertiary">{job.category}</Typography>
        </div>

        <Typography id="modal-desc" textColor="text.tertiary">
          {job.description}
        </Typography>

        <Typography textColor="text.tertiary" sx={{ mt: 2 }}>
          <span className="font-semibold">Posted At: </span>
          {new Date(job.createdAt).toDateString()}
        </Typography>

        <Typography textColor="text.tertiary">
          <span className="font-semibold">Salary:</span> {job.salary}
        </Typography>
      </Sheet>
    </Modal>
  );
};

export default JobDetailsModal;
