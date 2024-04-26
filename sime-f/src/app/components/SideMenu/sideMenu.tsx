import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sideMenu.scss";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext, useLoader } from "../../Global/Context/globalContext";
import { User } from "../../interfaces/user/User";

const SideMenu = (user : User) => {
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
      <hr className="border border-secondary border-1 opacity-75" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to={"/list/users"} className={`nav-link link-light ${location.pathname === '/list/users' ? 'active' : ''}`} >
            <i className="bi bi-people" />
            &nbsp; Usuarios
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/register/user/"} className={`nav-link link-light ${location.pathname === '/register/user/' ? 'active' : ''}`}>
            <i className="bi bi-plus" />
            &nbsp; Nuevo Usuario
          </Link>
          <hr className="border border-secondary border-1 opacity-75" />
        </li>
        <li className="nav-item">
          <Link to={"/list/students/"} className={`nav-link link-light ${location.pathname === '/list/students/' ? 'active' : ''}`} >
            <i className="bi bi-book" />
            &nbsp; Estudiantes
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/register/student/"} className={`nav-link link-light ${location.pathname === '/register/student/' ? 'active' : ''}`} >
            <i className="bi bi-plus" />
            &nbsp; Nuevo Estudiante
          </Link>
          <hr className="border border-secondary border-1 opacity-75" />
        </li>
      </ul>
      <hr className="border border-secondary border-1 opacity-75" />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-light text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src="https://scx2.b-cdn.net/gfx/news/hires/2018/1-detectingfak.jpg" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>{user.first_name + " " + user.last_name}</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            {/* Todo - create user profile page and here the link */}
            <Link to={"/"} className="nav-link">
              <i className="bi bi-person"/>
              Perfil
            </Link>
          </li>
          <li>
            <button className="nav-link" onClick={logout}>
              <i className="bi bi-box-arrow-left"/>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
