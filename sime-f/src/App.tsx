import { useEffect, useReducer } from "react";
import "./App.scss";
import { authReducer } from "./app/Global/reducers/authReducers";
import { AuthContext, LoaderProvider } from "./app/Global/Context/globalContext";
import { AppRouter } from "./app/routes/app.router";
import { useLocation } from "react-router-dom";
import SideMenu from "./app/components/SideMenu/sideMenu";
import "./app/components/SideMenu/sideMenu.scss";
import Loader from "./app/components/shared/Loader/Loader";
import 'react-toastify/dist/ReactToastify.css';
import { AuthService } from "./app/services/auth/AuthService";
import { ToastContainer } from "react-toastify";

function initializeUser() {
  const sessionUser = sessionStorage.getItem("user");
  if (!sessionUser) return null;
  return { ...JSON.parse(sessionUser), loggedIn: true };
}

function getSidebar(user: any, getSharedContent: () => boolean){
  if (!getSharedContent()) return null;
  return (
      <SideMenu {...user} />
  );
}

async function checkIfUserIsLoggedIn(dispatchUser: any) {
  try {
    const resp = await AuthService.me();
    if (resp.status === 200) {
      dispatchUser({ type: "LOGIN", payload: { ...resp.user, loggedIn: true } });
    } else {
      dispatchUser({ type: "LOGOUT", payload: null });
      sessionStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
  }
}

function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, initializeUser);
  let location = useLocation();

  const getSharedContent = () => {
    return !location.pathname.includes("/auth") && !location.pathname.includes("/forms") && location.pathname !== "/";
  };

  useEffect(() => {
    checkIfUserIsLoggedIn(dispatchUser);
  }, []);

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, dispatchUser }}>
        <LoaderProvider>
        <Loader />
        <div className="sime">
          {getSidebar(user, getSharedContent)}
          <div className="content">
            <AppRouter />
          </div>
        </div>
        <ToastContainer />
        </LoaderProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
