import DialogSave from "./DialogSave";
import { Task } from "../../types/Tasks";

interface Props {
  task: Task;
  open: boolean;
  handleClose: any;
}
export default function EditTask({ task, open, handleClose }: Props) {
  console.log('EditTask', task, open)
  return (
    <>
      <DialogSave open={open} handleClose={handleClose} task={task} />
    </>
  );
}
