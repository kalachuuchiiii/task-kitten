import { ButtonGroup } from "@/components/ui/button-group";
import { CardContent, CardFooter } from "@/components/ui/card";
import { daysBetween } from "@/utils";
import type { TaskDocument } from "@shared/types";
import { ChevronRightIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@shared/utils";

export const TaskOverview = ({
  task,
  clamp = 'none',
}: {
  task: TaskDocument;
  clamp?: number | 'none';
}) => {
  
  return (
    <>
      <CardContent className="min-h-12 mb-4">
        <div className="flex items-start justify-between w-full">
          <NavLink to={`/task/${task._id}`} className={"w-full"}>
            {" "}
            <p className = {`wrap-anywhere  font-semibold max-w-11/12 w-full line-clamp-${clamp} `}>
              {task.description}
            </p>
          </NavLink>{" "}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3">
        <div className="flex gap-1 justify-between w-full opacity-90 items-center">
          <div className="flex items-center w-full justify-between max-w-xs">
            <p className=" font-semibold text-xs ">
              Started at {formatDate(task.startedAt)}
            </p>
            <ChevronRightIcon size={16} />
            <p className=" font-semibold text-xs ">
              Due at {formatDate(task.due)}
            </p>
          </div>
          <p className="text-xs truncate font-semibold">
            {" "}
            {daysBetween(task.startedAt, task.due)} d
          </p>
        </div>
        <div className="flex w-full justify-between  items-center">
          <p className="text-xs font-semibold opacity-70">
            Created {format(task.createdAt)}
          </p>
          <ButtonGroup orientation={"horizontal"} className="flex  ">
            <PriorityBadge priority={task.priority} />
            <StatusBadge badgeName={task.status} />
          </ButtonGroup>
        </div>
        <div className="flex max-w-xl font-semibold  underline  tracking-tighter flex-wrap gap-5 text-xs">
         {task.keywords.map((kw) => <p key = {kw}>#{kw}</p>)}
        </div>
      </CardFooter>
    </>
  );
};
