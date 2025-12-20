import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputGroupButton } from "@/components/ui/input-group";
import { Plus } from "lucide-react";
import { useTaskActions } from "../hooks";

import { Button } from "@/components/ui/button";
import { TaskFormFields } from "./TaskFormFields";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const CreateTaskDialog = () => {
  const { createTask, isCreatingTask, formControl } = useTaskActions();

  return (
    <SheetContent className=" p-3 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>New task</SheetTitle>
          <SheetDescription>You can change these later</SheetDescription>
        </SheetHeader>
        <TaskFormFields onSubmit={(e) => createTask(e)} id="create-task" {...formControl} />
          <Button
            disabled={isCreatingTask}
            className="button-bg w-full"
            type="submit"
            form="create-task"
          >
            Create task
          </Button>
    </SheetContent>
  );
};
