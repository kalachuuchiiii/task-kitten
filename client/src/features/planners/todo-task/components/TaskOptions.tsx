import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useTaskActions } from "../hooks";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskFormFields } from "./TaskFormFields";
import type { TaskDocument, TaskFormFieldTypes } from "@shared/types";
import { Textarea } from "@/components/ui/textarea";

export const TaskOptions = ({ taskDetail }: { taskDetail: TaskFormFieldTypes  }) => {
  const { deleteTask, isDeletingTask, formControl, updateTask, isUpdatingTask } = useTaskActions(taskDetail);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Dialog >
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="w-full">Update</DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Update</DialogTitle>
            <DialogDescription>Update existing task.</DialogDescription>
            <TaskFormFields {...formControl} />
            <Textarea onChange = {formControl.handleChangeNote} value = {formControl.taskForm.note} placeholder= "Describe this update (optional)" className="border-0 resize-none" aria-haspopup = 'false' />
            <DialogFooter>
            
              <button onClick = {() => updateTask()} disabled = {isUpdatingTask} className="button-bg w-full rounded p-2">
                 Update
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="w-full"
            >
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>
              Are you sure you want to delete this task?
            </AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone!</AlertDialogDescription>
            <AlertDialogFooter>
              <div className="w-full grid grid-cols-12  mt-6 space-y-2">
                <AlertDialogCancel className=" button-bg col-span-7 p-1 rounded">
                  Cancel
                </AlertDialogCancel>
                <Button
                  className="w-full p-2 rounded font-semibold col-span-5 tracking-tight text-red-600"
                  onClick={() => deleteTask()}
                  variant={"secondary"}
                  disabled={isDeletingTask}
                >
                  Delete
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
