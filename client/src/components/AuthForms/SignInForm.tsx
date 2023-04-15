import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AuthForm.scss";
import { AppLoader } from "../Loader/Loader";
import { userSignIn } from "../../store/activeuser/actions";
import { AppDispatch, RootState } from "../../store/reducers";
import AuthInput from "../AuthFormsInputs/AuthInput";
import AuthInputPassword from "../AuthFormsInputs/AuthInputPassword";

export default function SignInForm() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const isLoading = useSelector(
    (state: RootState) => state.activeUser.isLoading
  );
  const dispatch: AppDispatch = useDispatch();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      userSignIn({
        email: userData.email.toLowerCase(),
        password: userData.password,
      })
    );
  };

  if (isLoading) return <AppLoader />;

  return (
    <div className="auth-form__container">
      <form onSubmit={handleSubmit}>
        <fieldset className="clearfix">
          <AuthInput
            inputName="email"
            inputValue={userData.email}
            inputPlaceholder={"Ел. пошта"}
            onChange={handleUserInput}
          />
          <AuthInputPassword
            inputName="password"
            inputValue={userData.password}
            inputPlaceholder={"Парооль"}
            onChange={handleUserInput}
          />
          <p>
            <button
              className="auth-form__button button"
              type="submit"
            >
              Увійти
            </button>
          </p>
        </fieldset>
      </form>
      <p className="user-form__nav">
        <span>Немає профілю?</span> &nbsp;&nbsp;
        <Link to="/signup">Зареєструватись</Link>
        <span className="fontawesome-arrow-right auth-form__icon"></span>
      </p>
    </div>
  );
}
