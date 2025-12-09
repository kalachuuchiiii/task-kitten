
import { capitalize } from "@/utils";
import type { TaskStatus } from "@shared/types";
import { CheckIcon, CircleDot, LoaderCircleIcon, X } from "lucide-react";

export const StatusBadge = ({
  badgeName,
} : { badgeName: TaskStatus; } ) => {
  const icons = {
    pending: <LoaderCircleIcon size = {11} />,
    in_progress: <CircleDot size = {11}  />,
    completed: <CheckIcon size = {11}  />,
    cancelled: <X size = {11}  />
  }
  return <div className={`status-${badgeName} flex items-center rounded-md gap-2`}>{icons[badgeName]}{capitalize(badgeName)}</div>;
};
