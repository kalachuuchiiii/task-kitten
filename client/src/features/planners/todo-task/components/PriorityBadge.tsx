
import { capitalize } from "@/utils";
import type { TaskPriority } from "@shared/types";
import { ChevronsDown, ChevronsUp, ChevronsUpDown } from "lucide-react";

export const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const icons = {
    low: <ChevronsDown size = {13} />,
    moderate: <ChevronsUpDown  size = {13} />,
    high: <ChevronsUp  size = {13} />,
  };
  return (
    <div
      className={`priority-${priority} font-semibold  tracking-tight flex items-center gap-2 rounded-md`}
    >
      {icons[priority]} {capitalize(priority)} Priority
    </div>
  );
};
