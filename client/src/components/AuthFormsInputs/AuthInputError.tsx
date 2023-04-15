import "./AuthInput.scss";

export default function AuthInputError({ errorText, showError }: any) {
  if (showError) {
    return (
      <div>
        <p className="auth-input__error">{errorText}</p>
      </div>
    );
  }
  return null;
}
