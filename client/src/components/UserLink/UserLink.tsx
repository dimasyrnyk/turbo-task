import React from "react";
import { Link } from "react-router-dom";

export default function UserLink({ user }: any) {
  return (
    <Link
      to={`/user/${user._id}`}
      className="task__user"
    >
      <img
        src={require("../../images/" + user.avatar)}
        alt="avatar"
        className="task-manager__avatar"
      />
      <span>{user.login}</span>
    </Link>
  );
}
