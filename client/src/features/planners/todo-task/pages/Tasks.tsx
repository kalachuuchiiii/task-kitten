import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { FilterIcon, Search } from "lucide-react";

import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";
import { CreateTaskDialog } from "../components";

const Tasks = () => {
  const { tasks, ref } = useTasks();

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
          <CreateTaskDialog />
        </InputGroup>
      </div>
      <div className="my-8 grid grid-cols-1 gap-2 md:grid-cols-2 space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))} 
      </div>
      <div ref={ref} />
    </div>
  );
};

export default Tasks;
