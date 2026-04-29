import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../../redux/slices/taskSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialoug({ itemId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  { /* Delete task from redux store */ }
  const handleConfirmDelete = () => {
    dispatch(removeTask(itemId));
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="border border-gray-400 hover:bg-red-500 hover:text-white duration-150 rounded-md px-2 py-1 text-red-600"
      >
        Delete
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
