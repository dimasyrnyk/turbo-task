import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "../../components/Home/Home";
import SignInForm from "../../components/AuthForms/SignInForm";
import SignUpForm from "../../components/AuthForms/SignUpForm";
import TaskManager from "../TaskManager/TaskManager";
import TaskPage from "../../components/TaskPage/TaskPage";
import User from "../../components/User/User";
import Alert from "../../components/Alert/Alert";
import { RootState } from "../../store/reducers";
import { AppLoader } from "../../components/Loader/Loader";

export default function Main() {
  const { isLoading, isAuth, alert } = useSelector((state: RootState) => ({
    isLoading: state.activeUser.isLoading,
    isAuth: state.activeUser.auth,
    alert: state.app.alert,
  }));

  if (isLoading) return <AppLoader />;

  return (
    <main>
      {alert ? (
        <Alert
          text={alert.text}
          error={alert.error}
        />
      ) : null}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate
                to="/task-manager/my"
                replace
              />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/task-manager/*"
          element={
            isAuth ? (
              <TaskManager />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />
        <Route
          path="/user/:id"
          element={
            isAuth ? (
              <User />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />
        <Route
          path="/task/:id"
          element={
            isAuth ? (
              <TaskPage />
            ) : (
              <Navigate
                to="/"
                replace
              />
            )
          }
        />
        <Route
          path="signin"
          element={
            isAuth ? (
              <Navigate
                to="/task-manager/my"
                replace
              />
            ) : (
              <SignInForm />
            )
          }
        />
        <Route
          path="signup"
          element={
            isAuth ? (
              <Navigate
                to="/task-manager/my"
                replace
              />
            ) : (
              <SignUpForm />
            )
          }
        />
      </Routes>
    </main>
  );
}
