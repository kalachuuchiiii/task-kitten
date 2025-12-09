import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {

  InputGroupButton,

} from "@/components/ui/input-group";
import {  Plus } from "lucide-react";
import { useTaskActions } from "../hooks";


import { Button } from "@/components/ui/button";
import { TaskFormFields } from "./TaskFormFields";

export const CreateTaskDialog = () => {
  const {
    createTask,
    isCreatingTask,
    formControl
  } = useTaskActions();

  return (
    <Dialog>
      <DialogTrigger>
        <InputGroupButton className="flex items-center gap-2">
          <Plus />
        </InputGroupButton>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New task</DialogTitle>
        <DialogDescription>You can change these later</DialogDescription>
       <TaskFormFields {...formControl} />
        <DialogFooter>
          <Button
            disabled={isCreatingTask}
            onClick={() => createTask()}
            className="button-bg w-full"
          >
            Create task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
