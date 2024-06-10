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

// function getFloatingButton( handleCollapse: () => void, getSharedContent: () => boolean){
//   if (!getSharedContent()) return null;
//   return (
//     <div className="floatingButton">
//       <button className="coll-btn" type="button" onClick={handleCollapse}>
//         <i className="bi bi-chevron-left"></i>
//       </button>
//     </div>
//   );
// }

function App() {
  const [user, dispatchUser] = useReducer(authReducer, {}, initializeUser);
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

  useEffect(() => {
    checkIfUserIsLoggedIn(dispatchUser);
  }, []);

  // const handleCollapse = () => {
  //   const sideMenu = document.querySelector(".sideMenu");
  //   if (!sideMenu) return;
  //   sideMenu.classList.toggle("noShow");
  //   const icon = document.querySelector(".bi");
  //   if (!icon) return;
  //   icon.classList.toggle("bi-chevron-right");
  //   icon.classList.toggle("bi-chevron-left");
  // }

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
