import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./TaskModalForm.scss";
import AppBtn from "../AppButtons/AppBtn";
import ModalSelect from "../ModalSelect/ModalSelect";
import InputTitle from "../ModalInputs/InputTitle";
import InputEmail from "../ModalInputs/InputEmail";
import DeadlineSetter from "../DeadlineSetter/DeadlineSetter";
import { AppDispatch, RootState } from "../../store/reducers";
import { taskCreate } from "../../store/tasks/actions";
import { TaskPriority, TaskStatus } from "../../types/task";
import { IUser } from "../../types/user";

const initState = {
  creator: "",
  title: "",
  priority: "HIGH",
  deadline: "",
  status: "NEW",
  users: [],
  text: "",
};

export default function TaskAddForm() {
  const [data, setData]: any = useState(initState);
  const [isOpen, setIsOpen] = useState(false);
  const activeUser = useSelector(
    (state: RootState) => state.activeUser.info
  ) as IUser;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const date = new Date();
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
    const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(date);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    setData({ ...data, deadline: `${da}/${mo}/${ye}` });
  }, [isOpen]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUserEmail = (
    value: React.ChangeEventHandler<HTMLTextAreaElement>
  ) => {
    setData({ ...data, users: value });
  };

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDatePicker = (date: string) => {
    setData({ ...data, deadline: date });
  };

  const handleClose = () => {
    setIsOpen(false);
    setData(initState);
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    const creator = {
      _id: activeUser._id,
      login: activeUser.login,
      avatar: activeUser.avatar,
    };

    const newTask = {
      creator: creator,
      title: data.title,
      priority: data.priority,
      deadline: data.deadline,
      status: data.status,
      checked: false,
      readedBy: [creator._id],
      users: data.users,
      text: data.text,
    };
    dispatch(taskCreate(newTask));
    setData(initState);
    setIsOpen(false);
  };

  return (
    <div>
      <AppBtn
        title={"Додати"}
        onClick={() => setIsOpen(true)}
        device={"mobile"}
      >
        <FontAwesomeIcon icon={faPlus} />
      </AppBtn>
      <AppBtn
        onClick={() => setIsOpen(true)}
        device={"desktop"}
      >
        Додати
      </AppBtn>

      {isOpen && (
        <div className="modal">
          <div className="modal__body">
            <h3 className="modal__title">Додати завдання</h3>
            <form className="modal__form">
              <InputTitle
                value={data.title}
                onChange={handleInput}
              />
              <ModalSelect
                enums={TaskPriority}
                value={data.priority}
                options={["HIGH", "MEDIUM", "LOW"]}
                onChange={handleInput}
              />
              <DeadlineSetter onChange={handleDatePicker} />
              <InputEmail onChange={handleUserEmail} />
              <ModalSelect
                enums={TaskStatus}
                value={data.status}
                options={["NEW", "WORK_ON_IT", "DONE", "STUCK"]}
                onChange={handleInput}
              />
              <span className="modal__row">
                <span className="row__title">Опис:</span>
                <textarea
                  className="modal__textarea"
                  name="text"
                  value={data.text}
                  onChange={handleText}
                  placeholder="Опишіть завдання"
                ></textarea>
              </span>
            </form>
            <div className="modal__controls">
              <AppBtn onClick={onSubmit}>Додати завдання</AppBtn>
              <AppBtn onClick={handleClose}>Закрити</AppBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
