import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { FilterIcon, ListTodo, Plus, Search } from "lucide-react";

import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";
import { CreateTaskDialog } from "../components";
import { FilterTaskForm } from "../components/FilterTaskForm";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { TaskContext } from "../context";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { useSession } from "@/features/auth";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const CreateTaskSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="button-bg">
          Create new task <Plus />
        </Button>
      </SheetTrigger>

      <CreateTaskDialog />
    </Sheet>
  );
};

const Tasks = () => {
  const { tasks, ref, filterControl } = useTasks();
  const { user } = useSession();

  return (
    <>
      <div className="flex w-full gap-4">
        <div className="p-2 flex w-full items-center justify-end  rounded-xl">
          {tasks.length > 0 && (
            <div className="flex items-center   gap-2">
              <CreateTaskSheet />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"}>
                    <FilterIcon />
                  </Button>
                </SheetTrigger>
                <TaskContext value={{ ...filterControl }}>
                  <FilterTaskForm />
                </TaskContext>
              </Sheet>
            </div>
          )}
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="my-8 grid grid-cols-1 gap-2 lg:grid-cols-2 space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <Empty>
         
          <EmptyHeader>
             <EmptyMedia variant={'icon'} >
            <ListTodo />
          </EmptyMedia>
            <EmptyTitle>No tasks yet</EmptyTitle>
            <EmptyDescription>
              Start tracking your tasks by creating one
            </EmptyDescription>
            <EmptyContent>
               <div className="p-2" >
                 <CreateTaskSheet />
               </div>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      )}

      <div ref={ref} />
    </>
  );
};

export default Tasks;
