import { useReducer } from "react";
import "./App.scss";
import { authReducer } from "./app/Global/reducers/authReducers";
import { AuthContext, LoaderProvider } from "./app/Global/Context/globalContext";
import { AppRouter } from "./app/routes/app.router";
import { useLocation } from "react-router-dom";
import SideMenu from "./app/components/SideMenu/sideMenu";
import "./app/components/SideMenu/sideMenu.scss";
import Loader from "./app/components/shared/Loader/Loader";

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
  let location = useLocation();


  const getSharedContent = () => {
    if (
      location.pathname.includes("/auth/") || // for auth pages
      location.pathname.includes("/forms/") // for form pages
    ) {
      return false;
    }
    return true;
  };

  const getSidebar = () => {
    if (!getSharedContent()) {
      return null;
    } else {
      return (
        <div className="sideMenu hideMenu" id="collapseSideMenu">
          <SideMenu />
        </div>
      );
    }
  };

  const getFloatingButton = () => {
    if (!getSharedContent()) {
      return null;
    } else {
      return (
        <div className="floatingButton">
          <button
            className="coll-btn"
            type="button"
            onClick={handleCollapse}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </div>
      );
    }
  }

  const handleCollapse = () => {
    document.querySelector(".sideMenu")?.classList.toggle("noShow");
    if (!document.querySelector(".sideMenu")?.classList.contains("noShow")) {
      document.querySelector(".bi")?.classList.remove("bi-chevron-right");
      document.querySelector(".bi")?.classList.add("bi-chevron-left");
    } else {
      document.querySelector(".bi")?.classList.remove("bi-chevron-left");
      document.querySelector(".bi")?.classList.add("bi-chevron-right");
    }
  };

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, dispatchUser }}>
        <LoaderProvider>
        <Loader />
        <div className="sime">
          {user ? getSidebar() : null}

          <div className="content">
            {user ? getFloatingButton() : null}
            <AppRouter />
          </div>
        </div>
        </LoaderProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
