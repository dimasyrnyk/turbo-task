import "./AuthInput.scss";
import AuthInputError from "./AuthInputError";

export default function AuthInput({
  inputName,
  inputValue,
  inputPlaceholder,
  onChange,
  showError,
  errorText,
}: any) {
  const classes =
    inputName === "login" ? "fontawesome-user" : "fontawesome-envelope";

  return (
    <div className="auth-input__wrapper">
      <span className={classes + " auth-input__icon"}></span>
      <span className="auth-input__body">
        <input
          type="text"
          value={inputValue}
          onChange={onChange}
          name={inputName}
          placeholder={inputPlaceholder}
        />
      </span>
      <AuthInputError
        errorText={errorText}
        showError={showError}
      />
    </div>
  );
}
