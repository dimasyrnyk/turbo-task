import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.scss";
import { userSignOut } from "../../store/activeuser/actions";
import { AppDispatch, RootState } from "../../store/reducers";
import { IUser } from "../../types/user";

export default function Header() {
  const activeUser = useSelector(
    (state: RootState) => state.activeUser.info
  ) as IUser;
  const isAuth = useSelector((state: RootState) => state.activeUser.auth);
  const userLink = `/user/${activeUser._id && activeUser._id}`;
  const dispatch: AppDispatch = useDispatch();

  const signOut = () => {
    dispatch(userSignOut());
  };

  const navAuthFalse = (
    <ul>
      <li>
        <Link to="/signin">Увійти</Link>
      </li>
      <li>
        <Link to="/signup">Зареєструватись</Link>
      </li>
    </ul>
  );

  const navAuthTrue = (
    <ul>
      <li>
        <Link to={userLink}>{activeUser.login && activeUser.login}</Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={signOut}
        >
          Вийти
        </Link>
      </li>
    </ul>
  );

  return (
    <header>
      <h1>
        <Link to="/">TurboTask</Link>
      </h1>
      <nav>{isAuth ? navAuthTrue : navAuthFalse}</nav>
    </header>
  );
}
