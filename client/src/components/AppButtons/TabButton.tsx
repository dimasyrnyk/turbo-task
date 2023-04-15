import { Link } from "react-router-dom";

import "./Buttons.scss";

export default function TabButton({ path, name, isActive, tasksCount }: any) {
  const classes = isActive ? "active" : "";

  return (
    <Link to={path}>
      <button className={"tab-button " + classes}>
        {name}{" "}
        {tasksCount > 0 ? (
          <span className="tab-button__unreaded-task_count ">{tasksCount}</span>
        ) : null}
      </button>
    </Link>
  );
}
