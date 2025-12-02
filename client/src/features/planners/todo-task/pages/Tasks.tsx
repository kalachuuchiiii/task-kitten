import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { taskStatus } from "@/constants/taskStatus";
import { capitalize } from "@/utils/capitalize";

import { FilterIcon, Plus, Search } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";

const Tasks = () => {
  const {
    taskForm,
    handleChangeStatus,
    tasks,
    createTask,
    isCreatingTask,
    handleChangeDescription,
    ref,
  } = useTasks();

  return (
    <div className="py-12 w-full  px-20">
      <h1 className="h-full w-full mb-10 text-center text-4xl font-bold tracking-tight">
        To Do List
      </h1>

      <div className="flex w-full gap-4">
        <InputGroup className="p-5 flex items-start rounded-xl">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupTextarea
            placeholder="Search tasks..."
            className="w-10 pt-1"
          />
          <InputGroupButton>Search</InputGroupButton>
          <p className="text-neutral-200 mx-2">|</p>
          <InputGroupButton>
            <FilterIcon />
          </InputGroupButton>
          <p className="text-neutral-200 mx-2">|</p>

          <Dialog>
            <DialogTrigger>
              <InputGroupButton className="flex items-center gap-2">
                <Plus />
              </InputGroupButton>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>New task</DialogTitle>
              <DialogDescription>You can change these later</DialogDescription>
              <div className="flex gap-2 p-2 items-start">
                <Textarea
                  placeholder="Describe the task"
                  onChange={handleChangeDescription}
                  value={taskForm.description}
                  className="pt-1 max-w-xs  "
                />

                <Select onValueChange={handleChangeStatus}>
                  <SelectTrigger>{capitalize(taskForm.status)}</SelectTrigger>
                  <SelectContent>
                    {taskStatus.map((status) => (
                      <SelectItem value={status}>
                        {capitalize(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
        </InputGroup>
      </div>
      <div className="my-8 grid grid-cols-1 gap-2 md:grid-cols-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard task={task} />
        ))}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default Tasks;
