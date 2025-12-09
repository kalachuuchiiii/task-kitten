import { Card  } from "@/components/ui/card";
import type { TaskDocument } from "@shared/types";;
import { TaskOverview } from "./TaskOverview";

export const TaskCard = ({ task }: { task: TaskDocument }) => {
  return (
    <Card
      className={` task-card-${task.status}  flex flex-col justify-between`}
    >
      <TaskOverview task={task} clamp={2} />
    </Card>
  );
};
