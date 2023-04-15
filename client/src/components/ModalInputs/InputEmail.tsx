import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/reducers";
import { usersFilterFetch } from "../../store/users/actions";
import { IUser } from "../../types/user";
import { useDebounce } from "../../hooks/useDebbounce";

export default function InputEmail(props: any) {
  const [taskUsers, setTaskUsers] = useState<any[]>(props.taskUsers || []);
  const [showUsers, setShowUsers] = useState(false);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 1000);
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (debouncedValue && value.length > 0) {
      dispatch(usersFilterFetch(debouncedValue));
    }
  }, [debouncedValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setShowUsers(newValue.length > 0);

    const checkUser = users.filter(
      (user: IUser) => user.email === newValue.toLowerCase()
    );
    if (checkUser.length > 0) {
      handleAdd(checkUser[0]._id);
    }
  };

  const handleAdd = (e: any) => {
    const userValue = typeof e === "string" ? e : e.target.id;
    const newUser = users.find(
      (user: IUser) => user.email === userValue
    ) as IUser;
    const newUsers = [
      ...taskUsers,
      {
        _id: newUser._id,
        login: newUser.login,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    ];
    setValue("");
    setTaskUsers(newUsers);
    setShowUsers(false);
    props.onChange(newUsers);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const parent = target.parentElement;
    if (parent) {
      const email = parent.innerText;
      if (email !== null) {
        const newUsers = [...taskUsers].filter((user) => user.email !== email);

        setTaskUsers(newUsers);
        props.onChange(newUsers);
      }
    }
  };

  const handleFocus = () => {
    setShowUsers(value.length > 0);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowUsers(false);
    }, 500);
  };

  return (
    <span className="modal__row">
      <span className="row__title">Поділитися з:</span>
      <div className="modal__email">
        {taskUsers.map((user, index) => (
          <span
            className="modal__email_checked"
            key={index}
          >
            {user.email}
            <i
              className="modal__email_remove fontawesome-trash"
              onClick={handleDelete}
            />
          </span>
        ))}
        <input
          className="modal__email_input"
          type="text"
          value={value}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Введіть ел. пошту"
        />
      </div>
      {showUsers ? (
        <ul className="modal__email_users">
          {users.map((user: IUser, index: number) => (
            <li
              id={user.email}
              onClick={handleAdd}
              key={index}
            >
              {user.email}
            </li>
          ))}
        </ul>
      ) : null}
    </span>
  );
}
