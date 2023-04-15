import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./AuthForm.scss";
import { AppLoader } from "../Loader/Loader";
import { userSignUp } from "../../store/activeuser/actions";
import { AppDispatch, RootState } from "../../store/reducers";
import AuthInput from "../AuthFormsInputs/AuthInput";
import AuthInputPassword from "../AuthFormsInputs/AuthInputPassword";

const initState = {
  login: "",
  email: "",
  password: "",
  confirm: "",
};

export default function SignUpForm() {
  const [userData, setUserData] = useState(initState);
  const [formErrors, setFormErrors] = useState(initState);
  const [formValid, setFormValid] = useState({
    isLoginValid: false,
    isEmailValid: false,
    isPasswordValid: false,
    isConfirmValid: false,
    isFormValid: false,
  });
  const isLoading = useSelector(
    (state: RootState) => state.activeUser.isLoading
  );
  const dispatch: AppDispatch = useDispatch();

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      login: userData.login,
      email: userData.email.toLowerCase(),
      password: userData.password,
      avatar: "new_user.png",
    };
    dispatch(userSignUp(newUser));
  };

  const validateField = (fieldName: string, value: string) => {
    let errors = formErrors;
    let loginValid: any = formValid.isLoginValid;
    let emailValid: any = formValid.isEmailValid;
    let passwordValid = formValid.isPasswordValid;
    let confirmValid = userData.password === userData.confirm;
    const isEmpty = value === "";

    switch (fieldName) {
      case "login":
        loginValid = isEmpty || value.match(/^([\w.%+-]{4,20})$/i);
        errors.login = loginValid ? "" : "Введіть латинською";
        break;
      case "email":
        emailValid =
          isEmpty || value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        errors.email = emailValid ? "" : "Ел. пошта не правильна";
        break;
      case "password":
        passwordValid = isEmpty || value.length >= 6;
        errors.password = passwordValid ? "" : "Пароль закороткий";
        break;
      case "confirm":
        confirmValid = isEmpty || userData.password === value;
        errors.confirm = confirmValid ? "" : "Підтвердіть пароль";
        break;
      default:
        break;
    }
    setFormErrors(errors);
    setFormValid({
      isLoginValid: loginValid,
      isEmailValid: emailValid,
      isPasswordValid: passwordValid,
      isConfirmValid: confirmValid,
      isFormValid: loginValid && emailValid && passwordValid && confirmValid,
    });
  };

  if (isLoading) return <AppLoader />;

  return (
    <div className="auth-form__container">
      <form onSubmit={handleSubmit}>
        <fieldset className="clearfix">
          <AuthInput
            inputName={"login"}
            inputValue={userData.login}
            inputPlaceholder={"Логін"}
            onChange={handleUserInput}
            showError={!formValid.isLoginValid}
            errorText={formErrors.login}
          />
          <AuthInput
            inputName="email"
            inputValue={userData.email}
            inputPlaceholder={"Ел. пошта"}
            onChange={handleUserInput}
            showError={!formValid.isEmailValid}
            errorText={formErrors.email}
          />

          <AuthInputPassword
            inputName={"password"}
            inputValue={userData.password}
            inputPlaceholder={"Парооль"}
            onChange={handleUserInput}
            showError={!formValid.isPasswordValid}
            errorText={formErrors.password}
          />
          <AuthInputPassword
            inputName={"confirm"}
            inputValue={userData.confirm}
            inputPlaceholder={"Підтвердіть пароль"}
            onChange={handleUserInput}
            showError={!formValid.isConfirmValid}
            errorText={formErrors.confirm}
          />
          <p>
            <button
              className="auth-form__button button"
              type="submit"
              disabled={!formValid.isFormValid}
            >
              Зареєструватись
            </button>
          </p>
        </fieldset>
      </form>
      <p className="auth-form__nav">
        <span>Вже є профіль?</span> &nbsp;&nbsp;
        <Link to="/signin">Увійти</Link>
        <span className="fontawesome-arrow-right auth-form__icon"></span>
      </p>
    </div>
  );
}
