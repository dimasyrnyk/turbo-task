import { useState } from "react";

import "./AuthInput.scss";
import AuthInputError from "./AuthInputError";

export default function AuthInputPassword({
  inputName,
  inputValue,
  inputPlaceholder,
  onChange,
  showError,
  errorText,
}: any) {
  const [showPassword, setShowPassword] = useState(false);

  const hadleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-input__wrapper">
      <span className="fontawesome-lock auth-input__icon"></span>
      <span className="auth-input__body">
        <input
          type={showPassword ? "text" : "password"}
          value={inputValue}
          onChange={onChange}
          name={inputName}
          placeholder={inputPlaceholder}
        />
        {showPassword ? (
          <i
            className="fontawesome-eye-close auth-input__icon_show-password"
            onClick={hadleShowPassword}
          ></i>
        ) : (
          <i
            className="fontawesome-eye-open auth-input__icon_show-password"
            onClick={hadleShowPassword}
          ></i>
        )}
      </span>
      <AuthInputError
        errorText={errorText}
        showError={showError}
      />
    </div>
  );
}
