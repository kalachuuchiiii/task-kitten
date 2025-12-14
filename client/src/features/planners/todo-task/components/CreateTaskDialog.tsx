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
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const CreateTaskDialog = () => {
  const {
    createTask,
    isCreatingTask,
    formControl
  } = useTaskActions();

  return (


     <SheetContent className="p-4 overflow-y-auto">
       <SheetHeader>
         <SheetTitle>New task</SheetTitle>
        <SheetDescription>You can change these later</SheetDescription>
       </SheetHeader>
       <TaskFormFields {...formControl} />
        <SheetFooter>
          <Button
            disabled={isCreatingTask}
            onClick={() => createTask()}
            className="button-bg w-full"
          >
            Create task
          </Button>
        </SheetFooter>
      </SheetContent>
  );
};
