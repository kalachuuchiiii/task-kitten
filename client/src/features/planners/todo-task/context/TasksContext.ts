import { createContext } from "react";
import type { useTasks } from "../hooks";

type TaskContextValues = Pick<ReturnType<typeof useTasks>, 'filterControl'>['filterControl'];
export const TaskContext = createContext<TaskContextValues>({} as TaskContextValues);