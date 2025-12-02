import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useTaskDetails } from "../hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const TaskOptions = () => {
  const { deleteTask, isDeletingTask } = useTaskDetails();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Update</DropdownMenuItem>

        <Dialog>
          <DialogTrigger className="w-full">
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="w-full"
            >
              Delete
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete this task?
            </DialogTitle>
            <DialogDescription>
                This action cannot be undone!
            </DialogDescription>
            <DialogFooter>
              <div className="w-full mt-6 space-y-2">
                <DialogClose className="w-full button-bg p-1 rounded">Cancel</DialogClose>
                <Button
                  className="w-full p-2 rounded font-semibold tracking-tight text-red-600"
                  onClick={() => deleteTask()}
                  variant={'secondary'}
                  disabled={isDeletingTask}
                >
                  Delete
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
