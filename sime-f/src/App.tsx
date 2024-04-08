import { useReducer } from "react";
import "./App.css";
import { authReducer } from "./app/Global/reducers/authReducers";
import { AuthContext } from "./app/Global/Context/globalContext";
import { AppRouter } from "./app/routes/app.router";

const init = () => {
  let sessionUser: any = sessionStorage.getItem("user");
  let user: any;
  if (!sessionUser) {
    user = null;
  } else {
    user = JSON.parse(sessionUser);
    user = { ...user, loggedIn: true };
  }
  return user;
};

function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, init);

  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
