import { useLocation } from "react-router-dom";

import TaskEditForm from "../TaskModalForm/TaskEditForm";
import TaskRemove from "../TaskRemove/TaskRemove";
import TaskAddForm from "../TaskModalForm/TaskAddForm";
import { ITask } from "../../types/task";
import TabButton from "../AppButtons/TabButton";

export default function ControlPanel({ userId, ownTasks, otherTasks }: any) {
  const checkedTasks: ITask[] = ownTasks.filter((task: ITask) => task.checked);
  const ownUnreadedTasksLength = ownTasks.filter(
    (task: ITask) => !task.readedBy.includes(userId)
  ).length;
  const otherUnreadedTasksLength = otherTasks.filter(
    (task: ITask) => !task.readedBy.includes(userId)
  ).length;
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  return (
    <div className="task-manager__control-panel">
      <nav className="control-panel__nav">
        <TabButton
          path={"my"}
          name={"Moї"}
          isActive={path === "my"}
          tasksCount={ownUnreadedTasksLength}
        />
        <TabButton
          path={"other"}
          name={"Інші"}
          isActive={path === "other"}
          tasksCount={otherUnreadedTasksLength}
        />
      </nav>
      <span className="control-panel__controls">
        {checkedTasks.length === 1 && (
          <TaskEditForm
            task={checkedTasks[0]}
            showTheSame={false}
          />
        )}
        {checkedTasks.length > 0 ? (
          <TaskRemove
            tasks={checkedTasks}
            showTheSame={false}
          />
        ) : null}
        <TaskAddForm />
      </span>
    </div>
  );
}
