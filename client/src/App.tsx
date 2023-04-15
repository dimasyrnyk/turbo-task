import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Footer from "./containers/Footer/Footer";
import Header from "./containers/Header/Header";
import Main from "./containers/Main/Main";
import { userCheckAuth } from "./store/activeuser/actions";
import { AppDispatch, RootState } from "./store/reducers";
import { tasksLoad } from "./store/tasks/actions";

function App() {
  const isAuth = useSelector((state: RootState) => state.activeUser.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("activeUser") || "{}") as any;
    // localStorage.removeItem("activeUser");

    if (data && data.accessToken) {
      dispatch(userCheckAuth());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      const intervalId = setInterval(() => {
        dispatch(tasksLoad()); // fetch tasks every 15 minutes
      }, 15 * 60 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
