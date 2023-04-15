import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import "./TaskModalForm.scss";
import AppBtn from "../AppButtons/AppBtn";
import ModalSelect from "../ModalSelect/ModalSelect";
import InputTitle from "../ModalInputs/InputTitle";
import InputEmail from "../ModalInputs/InputEmail";
import DeadlineSetter from "../DeadlineSetter/DeadlineSetter";
import { AppDispatch, RootState } from "../../store/reducers";
import { taskEdit } from "../../store/tasks/actions";
import { TaskPriority, TaskStatus } from "../../types/task";

export default function TaskEditForm({ task, showTheSame }: any) {
  const initState = {
    title: task.title,
    priority: task.priority,
    deadline: task.deadline,
    status: task.status,
    users: task.users,
    text: task.text,
  };

  const [data, setData]: any = useState(initState);
  const [isOpen, setIsOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.activeUser.userId);
  const dispatch: AppDispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      if (task.creator._id === userId) {
        setData({ ...data, [e.target.name]: e.target.value });
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
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
    const editedTask = {
      _id: task._id,
      creator: task.creator,
      title: data.title,
      priority: data.priority,
      deadline: data.deadline,
      status: data.status,
      checked: false,
      readedBy: [userId],
      users: data.users,
      text: data.text,
    };

    dispatch(taskEdit({ task: editedTask, userId: userId }));
    setIsOpen(false);
    setData(initState);
  };

  return (
    <div>
      {showTheSame ? (
        <AppBtn onClick={() => setIsOpen(true)}>Змінити</AppBtn>
      ) : (
        <>
          <AppBtn
            title={"Змінити"}
            onClick={() => setIsOpen(true)}
            device={"mobile"}
          >
            <FontAwesomeIcon icon={faPencil} />
          </AppBtn>
          <AppBtn
            onClick={() => setIsOpen(true)}
            device={"desktop"}
          >
            Змінити
          </AppBtn>
        </>
      )}

      {isOpen && (
        <div className="modal">
          <div className="modal__body">
            <h3 className="modal__title">Змінити завдання</h3>
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
              <DeadlineSetter
                onChange={handleDatePicker}
                date={data.deadline}
              />
              <InputEmail
                taskUsers={data.users}
                onChange={handleUserEmail}
              />
              <ModalSelect
                enums={TaskStatus}
                value={data.status}
                options={["NEW", "WORK_ON_IT", "DONE", "STUCK"]}
                onChange={handleInput}
              />
              <p className="modal__row">
                <span className="row__title">Опис:</span>
                <textarea
                  className="modal__textarea"
                  name="text"
                  value={data.text}
                  onChange={handleText}
                  placeholder="Опишіть завдання"
                ></textarea>
              </p>
            </form>
            <div className="modal__controls">
              <AppBtn onClick={onSubmit}>Зберегти зміни</AppBtn>
              <AppBtn onClick={handleClose}>Закрити</AppBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
