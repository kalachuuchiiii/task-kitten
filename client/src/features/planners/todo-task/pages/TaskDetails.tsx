import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useTaskDetails } from "../hooks";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { format } from "timeago.js";
import { TaskOptions } from "../components";

const TaskDetails = () => {
  const { taskDetail, isFetchingTaskDetail } = useTaskDetails();

  if (isFetchingTaskDetail) {
    return <LoadingDisplay />;
  }

  return (
    <div>
      <Card className={` p-5 relative `}>
        <div className="absolute  p-3 right-4 top-4">
          <TaskOptions />
        </div>
        <CardTitle>Task</CardTitle>
        <CardContent className="break-all">
          {taskDetail.description}
        </CardContent>
        <CardFooter>{format(taskDetail.createdAt)}</CardFooter>
      </Card>
    </div>
  );
};

export default TaskDetails;
