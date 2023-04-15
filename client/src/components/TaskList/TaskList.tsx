import TaskItem from "../TaskItem/TaskItem";
import { ITask } from "../../types/task";

export default function TaskList({
  tasks,
  isOwner,
  userId,
  checkAllTask,
}: any) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkAllTask(e.target.checked);
  };

  return (
    <>
      <div className="task-manager__header">
        {isOwner ? (
          <input
            id="checkbox__title"
            type="checkbox"
            className="task-manager__checkbox"
            onChange={handleCheck}
          />
        ) : null}
        <label
          htmlFor="checkbox__title"
          className="task-manager__name"
        >
          Назва
        </label>
        <span className="task-manager__priority">Приорітет</span>
        <span className="task-manager__deadline">Дедлайн</span>
        <span className="task-manager__users">Користувачі</span>
        <span className="task-manager__status">Статус</span>
      </div>
      {tasks.length ? (
        <ul className="task-manager__list">
          {tasks.map((task: ITask, index: number) => (
            <TaskItem
              key={index}
              task={task}
              isOwner={isOwner}
              userId={userId}
            />
          ))}
        </ul>
      ) : (
        <p className="task-manager__deadline">Немає завдань!</p>
      )}
    </>
  );
}
