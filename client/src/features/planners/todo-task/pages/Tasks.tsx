
import { FilterIcon, ListTodo, Plus, Search } from "lucide-react";

import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";

import { FilterTaskForm } from "../components/FilterTaskForm";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useSession } from "@/features/auth";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useTranslation } from "react-i18next";
import { useFilterTask } from "../hooks";
import { TaskFilterContext } from "../context";
import { useMemo } from "react";
import { CreateTaskSheet } from "../components";

const CreateTaskComponent = () => {
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="button-bg">
          {t("task_list.action.create")} <Plus />
        </Button>
      </SheetTrigger>
      <CreateTaskSheet />
    </Sheet>
  );
};

const Tasks = () => {
  const filterTaskValues = useFilterTask();
  const { filter } = filterTaskValues;
  const { tasks, ref, taskActions } = useTasks(filter);
  const { t } = useTranslation();
  const { totalOwnedTasks } = useSession();

  const memoizedValues = useMemo(() => ({ ...filterTaskValues, ...taskActions}), [filter, taskActions])

  return (
    <div>
      <div className="flex w-full gap-4">
        <div className="p-2 flex w-full items-center justify-end  rounded-xl">
          {totalOwnedTasks > 0 && (
            <div className="flex items-center   gap-2">
              <CreateTaskComponent />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"}>
                    <FilterIcon />
                  </Button>
                </SheetTrigger>
                <TaskFilterContext.Provider value={{ ...memoizedValues}}>
                  <FilterTaskForm />
                </TaskFilterContext.Provider>
              </Sheet>
            </div>
          )}
        </div>
      </div>

      {totalOwnedTasks === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <ListTodo />
            </EmptyMedia>
            <EmptyTitle>{t("task_list.empty.title")}</EmptyTitle>
            <EmptyDescription>{t("task_list.empty.subtitle")}</EmptyDescription>
            <EmptyContent>
              <div className="p-2">
                <CreateTaskComponent />
              </div>
            </EmptyContent>
          </EmptyHeader>
        </Empty>
      ) : tasks.length > 0 ? (
        <div className="my-8 grid grid-cols-1 gap-2 lg:grid-cols-2 space-y-2">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <p className="w-full opacity-50 font-semibold text-center">
          {t("task_list.no_tasks_found")}
        </p>
      )}
      {
        //** no tasks found ( main cause is the filter, so reset )  */
      }

      <div ref={ref} />
    </div>
  );
};

export default Tasks;
