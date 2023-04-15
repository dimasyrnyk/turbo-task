import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import "./User.css";
import AppButton from "../AppButtons/AppBtn";
import { AppLoader } from "../Loader/Loader";
import { AppDispatch, RootState } from "../../store/reducers";
import { oneUserFetch } from "../../store/users/actions";

export default function User() {
  const { activeUser, isLoading, oneUser } = useSelector(
    (state: RootState) => ({
      activeUser: state.activeUser,
      isLoading: state.users.isLoading,
      oneUser: state.users.oneUser,
    })
  );
  const userId = useParams<any>().id;
  const user: any = userId !== activeUser.userId ? oneUser : activeUser.info;
  const dispatch: AppDispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => await dispatch(oneUserFetch(userId));

    if (userId !== activeUser.userId) {
      loadData();
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <AppLoader />;

  if (!user._id)
    return (
      <div className="user__container">Вибачте, користувача не знайдено.</div>
    );

  return (
    <div className="user__container">
      <div className="user__profile">
        <img
          src={require("../../images/" + user.avatar)}
          alt="User avatar"
          className="user__avatar"
        />
        <div className="user_description">
          <h3 className="user__title">{user.login}</h3>
          <p className="user__title">Ел. Пошта: {user.email}</p>
          <p>
            Створені завдання{" "}
            <strong className="user__count">{user.ownTasks.length}</strong>
          </p>
          <p>
            Отримані завдання{" "}
            <strong className="user__count">{user.otherTasks.length}</strong>
          </p>
        </div>
      </div>
      <AppButton onClick={handleGoBack}>Назад</AppButton>
    </div>
  );
}
