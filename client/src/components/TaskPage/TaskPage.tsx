import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./TaskPage.scss";
import TaskAddForm from "../TaskModalForm/TaskEditForm";
import AppButton from "../AppButtons/AppBtn";
import TaskRemove from "../TaskRemove/TaskRemove";
import UserLink from "../UserLink/UserLink";
import { AppDispatch, RootState } from "../../store/reducers";
import { ITask } from "../../types/task";
import { TaskPriority, TaskStatus, TaskStatusIcon } from "../../types/task";
import { useEffect } from "react";
import { taskRead } from "../../store/tasks/actions";

export default function TaskPage() {
  const activeUser = useSelector((state: RootState) => state.activeUser) as any;
  const ownTasks = useSelector((state: RootState) => state.tasks.ownTasks);
  const otherTasks = useSelector((state: RootState) => state.tasks.otherTasks);
  const dispatch: AppDispatch = useDispatch();
  let navigate = useNavigate();
  const taskId = useParams<any>().id;
  const task = [...ownTasks, ...otherTasks].find(
    (task: ITask) => task._id === taskId
  ) as ITask;
  const isOwner = task.creator._id === activeUser.userId;
  const priority: keyof typeof TaskPriority =
    task.priority as keyof typeof TaskPriority;
  const status: keyof typeof TaskStatus =
    task.status as keyof typeof TaskStatus;
  const statusIcon: keyof typeof TaskStatusIcon =
    task.status as keyof typeof TaskStatusIcon;

  useEffect(() => {
    if (!task.readedBy.includes(activeUser.userId)) {
      const readedTask = task;
      readedTask.readedBy = [...task.readedBy, activeUser.userId];
      dispatch(
        taskRead({
          task: readedTask,
          userId: activeUser.userId,
        })
      );
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!task) {
    return <div className="task__container">На жаль завдання не знайдено.</div>;
  }

  return (
    <div className="task__container">
      <h2 className="task__title">
        {task.title}
        <span className={"task__priority " + task.priority}>
          {TaskPriority[priority]}
        </span>
      </h2>
      <div>
        <p className="task__deadline">
          Дедлайн:
          <span>{task.deadline}</span>
        </p>
        <p className="task__users">
          Автор:
          <span>{<UserLink user={task.creator} />}</span>
        </p>
        <p className="task__users">
          Користувачі:
          <span>
            {task.users.map((user, index) => (
              <UserLink
                user={user}
                key={index}
              />
            ))}
          </span>
        </p>
        <p className="task__status">
          Статус:
          <span
            className={
              "task-manager__status " + TaskStatusIcon[statusIcon] + task.status
            }
          >
            {" " + TaskStatus[status]}
          </span>
        </p>
      </div>
      <p className="task__description">{task.text}</p>
      <div className="task__controls">
        <TaskAddForm
          task={task}
          showTheSame={true}
        />
        {isOwner ? (
          <TaskRemove
            tasks={[task]}
            showTheSame={true}
          />
        ) : null}
        <AppButton onClick={handleGoBack}>Назад</AppButton>
      </div>
    </div>
  );
}
