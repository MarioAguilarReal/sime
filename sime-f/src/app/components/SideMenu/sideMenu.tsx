import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sideMenu.scss";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext, useLoader } from "../../Global/Context/globalContext";

const SideMenu = () => {
  const { dispatchUser }: any = useContext(AuthContext);
  const { setLoading } = useLoader();

  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    setLoading(true);
    const resp = await AuthService.logout();
    if (resp.status === 200) {
      dispatchUser({ type: "LOGOUT" });
      navigate("/");
    } else {
      console.log(resp.message);
    }
    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="sideMenu d-flex flex-column flex-shrink-0 p-3 bg-dark slide-menu">
      <Link
        to={"/"}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none dashboard-title"
      >
        <span className="fs-4">Dashboard</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={"/list/users"} className={`nav-link link-light ${location.pathname == '/list/users' ? 'active' : ''}`} >
            <i className="fa fa-user" />
            &nbsp; Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/register/user/"} className={`nav-link link-light ${location.pathname == '/register/user/' ? 'active' : ''}`}>
            <i className="fa fa-user" />
            &nbsp; New User
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/list/students/"} className="nav-link link-light">
            <i className="fa fa-home" />
            &nbsp; Students
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/register/student/"} className="nav-link link-light">
            <i className="fa fa-home" />
            &nbsp; New Student
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-light text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>Admin</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link to={"/"} className="nav-link">
              Back to Home
            </Link>
          </li>
          <li>
            <button className="nav-link" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
