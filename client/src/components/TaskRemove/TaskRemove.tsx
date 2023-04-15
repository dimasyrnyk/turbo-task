import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import AppBtn from "../AppButtons/AppBtn";
import { AppDispatch } from "../../store/reducers";
import { taskRemove } from "../../store/tasks/actions";
import { ITask } from "../../types/task";

export default function TaskRemove({ tasks, showTheSame }: any) {
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = () => {
    const removeAllCheckedTask = async () => {
      await tasks.map((task: ITask) => dispatch(taskRemove(task._id)));
    };

    removeAllCheckedTask();
  };

  return (
    <>
      <Link to="/task-manager/my">
        {showTheSame ? (
          <AppBtn onClick={onSubmit}>Видалити</AppBtn>
        ) : (
          <>
            <AppBtn
              title={"Видалити"}
              onClick={onSubmit}
              device={"mobile"}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </AppBtn>
            <AppBtn
              onClick={onSubmit}
              device={"desktop"}
            >
              Видалити
            </AppBtn>
          </>
        )}
      </Link>
    </>
  );
}
