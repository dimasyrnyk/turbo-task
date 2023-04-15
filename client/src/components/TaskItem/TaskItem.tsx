import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { taskCheck, taskUncheckAll } from "../../store/tasks/actions";
import { AppDispatch } from "../../store/reducers";
import { TaskPriority, TaskStatus, TaskStatusIcon } from "../../types/task";

export default function TaskItem({ task, isOwner, userId }: any) {
  const isReaded = task.readedBy.includes(userId);
  const dispatch: AppDispatch = useDispatch();

  const priority: keyof typeof TaskPriority =
    task.priority as keyof typeof TaskPriority;
  const status: keyof typeof TaskStatus =
    task.status as keyof typeof TaskStatus;
  const statusIcon: keyof typeof TaskStatusIcon =
    task.status as keyof typeof TaskStatusIcon;

  let avatars = [...[task.creator]]
    .concat([...task.users])
    .map((user, index) => (
      <Link
        to={`/user/${user._id}`}
        key={index}
      >
        <img
          src={require("../../images/" + user.avatar)}
          alt="avatar"
          className="task-manager__avatar"
        />
      </Link>
    ));

  const toggleCheckTask = () => {
    dispatch(taskCheck(task._id));
  };

  const handleUncheckAllTasks = () => {
    dispatch(taskUncheckAll());
  };

  return (
    <li
      className={
        "task-manager__item" + (isReaded ? " background_lightgrey" : "")
      }
      key={task._id}
    >
      {isOwner ? (
        <input
          id={task._id}
          type="checkbox"
          checked={task.checked}
          className="task-manager__checkbox"
          onChange={toggleCheckTask}
        />
      ) : null}
      <Link
        to={"/task/" + task._id}
        className="task-manager__name"
        onClick={handleUncheckAllTasks}
      >
        <label
          htmlFor={task._id}
          className={isReaded ? "" : "bold_font"}
        >
          {task.title}
        </label>
      </Link>
      <span className={"task-manager__priority " + task.priority}>
        {TaskPriority[priority]}
      </span>
      <span className="task-manager__deadline">{task.deadline}</span>
      <span className="task-manager__users">{avatars}</span>
      <span
        className={
          "task-manager__status " + TaskStatusIcon[statusIcon] + task.status
        }
      >
        {" " + TaskStatus[status]}
      </span>
    </li>
  );
}
