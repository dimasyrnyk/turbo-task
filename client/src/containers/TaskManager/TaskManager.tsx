import { useDispatch, useSelector } from "react-redux";

import "./TaskManager.scss";
import TaskList from "../../components/TaskList/TaskList";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import { AppDispatch, RootState } from "../../store/reducers";
import { Route, Routes } from "react-router-dom";
import { AppLoader } from "../../components/Loader/Loader";
import { taskCheckAll, tasksLoad } from "../../store/tasks/actions";
import { useEffect } from "react";

export default function TaskManager() {
  const { userId, ownTasks, otherTasks, isLoading } = useSelector(
    (state: RootState) => ({
      userId: state.activeUser.userId,
      ownTasks: state.tasks.ownTasks,
      otherTasks: state.tasks.otherTasks,
      isLoading: state.tasks.isLoading,
    })
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop === 0) {
        dispatch(tasksLoad());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const checkAllTask = (value: boolean) => {
    dispatch(taskCheckAll(value));
  };

  if (isLoading) return <AppLoader />;

  return (
    <div className="task-manager">
      <ControlPanel
        ownTasks={ownTasks}
        otherTasks={otherTasks}
        userId={userId}
      />
      <div>
        <Routes>
          <Route
            path="my"
            element={
              <TaskList
                tasks={ownTasks}
                isOwner={true}
                userId={userId}
                checkAllTask={checkAllTask}
              />
            }
          />
          <Route
            path="other"
            element={
              <TaskList
                tasks={otherTasks}
                isOwner={false}
                userId={userId}
                checkAllTask={checkAllTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
