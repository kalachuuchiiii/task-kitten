import { LoadingDisplay } from "@/components/ui/LoadingDisplay";
import { useTaskDetails } from "../hooks";
import { Card } from "@/components/ui/card";
import { TaskOverview } from "../components/TaskOverview";
import { HistoryCard, TaskOptions } from "../components";
import type { TaskFormFieldTypes } from "@shared/types";
import _ from "lodash";

const TaskDetails = () => {
  const { taskDetail, isFetchingTaskDetail, history, isFetchingTaskHistory, ref } = useTaskDetails();

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
