import { createContext } from "react";
import type { useFilterTask, useTasks } from "../hooks";

type TaskFilterContextValues = ReturnType<typeof useFilterTask> & ReturnType<typeof useTasks>['taskActions'] | null;
export const TaskFilterContext = createContext<TaskFilterContextValues>(null);