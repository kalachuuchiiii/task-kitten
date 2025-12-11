import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useTaskDetails, useTaskHistory } from "../hooks";
import { Card } from "@/components/ui/card";
import { TaskOverview } from "../components/TaskOverview";
import { HistoryCard, TaskOptions } from "../components";
import type { TaskFormFieldTypes } from "@shared/types";
import _ from "lodash";
import { Separator } from "@/components/ui/separator";

const TaskDetails = () => {
  const { taskDetail, isFetchingTaskDetail } = useTaskDetails();
  const { history, isFetchingTaskHistory, ref } = useTaskHistory();

  if (isFetchingTaskDetail || !taskDetail) {
    return <LoadingDisplay />;
  }

  const taskOptionDetails: TaskFormFieldTypes = {..._.omit(taskDetail, ['__v', '_id', 'createdAt', 'userId', 'updatedAt']), note: ''};
  
  return (
    <Card
      className={` task-card-${taskDetail.status} relative flex flex-col justify-between`}
    >
      <div className="absolute top-10 right-10">
        <TaskOptions taskDetail={taskOptionDetails}/>
      </div>
      <TaskOverview task={taskDetail} />
      <div>
        <div>
          <header className="flex px-5 items-center gap-5 mb-5 "><h1 className=" text-2xl  font-bold tracking-tight shrink-0"> Change logs </h1> <Separator className="min-w-0 shrink-1 " /> </header>
          {
            history.map((h) => <HistoryCard history={h} />)
          }
        </div>
        {isFetchingTaskHistory && <p>Loading History...</p>}
        <div ref = {ref} />
      </div>
    </Card>
  );
};

export default TaskDetails;
