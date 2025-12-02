import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { capitalize } from "@/utils/capitalize";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import { taskStatusStyles } from "@/constants/taskStatus";
import type { TaskDocument } from "@shared/types";

export const TaskCard = ({ task }: { task: TaskDocument }) => {

  const style = taskStatusStyles[task.status as keyof typeof taskStatusStyles];
  return (
    <Card className={`${style} flex flex-col justify-between`}>
      <CardContent>
        <div className="flex items-start justify-between ">
          <NavLink to={`/task/${task._id}`}>
            {" "}
            <p className="underline wrap-anywhere underline-offset-4 decoration-1">
              {task.description}
            </p>
          </NavLink>{" "}
        
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
          <p className={`${style} text-xs backdrop-brightness-50`}>{capitalize(task.status)}</p> <p>{'  '}</p>
        <p className=" font-bold text-xs">{format(task.createdAt)}</p>
      </CardFooter>
    </Card>
  );
};
