import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sideMenu.scss";
import { AuthService } from "../../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext, useLoader } from "../../Global/Context/globalContext";
import { User } from "../../interfaces/user/User";
import { Roles } from "../../common/generalData";

const SideMenu = (user: User) => {
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

  const getMenuItems = () => {
    return [
      {
        title: "Usuarios",
        icon: "bi bi-people",
        link: "/list/users",
        visible: user.role === Roles.ADMIN,
        division: false,
      },
      {
        title: "Nuevo Usuario",
        icon: "bi bi-plus",
        link: "/register/user/",
        visible: user.role === Roles.ADMIN,
        division: true,
      },
      {
        title: "Estudiantes",
        icon: "bi bi-book",
        link: "/list/students/",
        visible: true,
        division: false,
      },
      {
        title: "Nuevo Estudiante",
        icon: "bi bi-plus",
        link: "/register/student/",
        visible: user.role === Roles.ADMIN,
        division: true,
      },
      {
        title: "Grupos",
        icon: "bi bi-people",
        link: "/list/groups/",
        visible: user.role === Roles.ADMIN || user.role === Roles.TEACHER,
        division: false,
      },
      {
        title: "Clases",
        icon: "bi bi-book",
        link: "/list/classes/",
        visible: user.role === Roles.ADMIN || user.role === Roles.TEACHER,
        division: false,
      },
    ];
  };

  const handleCollapse = () => {
    const sideMenu = document.querySelector(".menu");
    console.log(sideMenu);
    if (!sideMenu) return;
    sideMenu.classList.toggle("noShow");
    const icon = document.querySelector(".chevron");
    if (!icon) return;
    icon.classList.toggle("bi-chevron-right");
    icon.classList.toggle("bi-chevron-left");
  };

  return (
    <div className="side">
      <div className="menu">
        <div className="sideMenu d-flex flex-column flex-shrink-0 p-3 bg-dark slide-menu">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none dashboard-title"
          >
            <span className="fs-4">Dashboard</span>
          </Link>
          <hr className="border border-secondary border-1 opacity-75" />
          <ul className="nav nav-pills flex-column mb-auto">
            {getMenuItems().map((item, index) =>
              item.visible ? (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.link}
                    className={`nav-link link-light ${
                      location.pathname === item.link ? "active" : ""
                    }`}
                  >
                    <i className={item.icon} />
                    &nbsp; {item.title}
                  </Link>
                  {item.division ? (
                    <hr className="border border-secondary border-1 opacity-75" />
                  ) : null}
                </li>
              ) : null
            )}
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
              <img
                src={
                  user.photo ? user.photo : "https://via.placeholder.com/150"
                }
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{user.first_name + " " + user.last_name}</strong>
            </a>
            <ul
              className="dropdown-menu text-small shadow p-3"
              aria-labelledby="dropdownUser2"
            >
              <li>
                {/* Todo - create user profile page and here the link */}
                <Link to={"/auth/profile/"} className="nav-link">
                  <i className="bi bi-person" />
                  Perfil
                </Link>
              </li>
              <hr className="border border-secondary border-1 opacity-75" />
              <li>
                <button className="nav-link">
                  <i className="bi bi-gear" />
                  Configuración
                </button>
              </li>
              <hr className="border border-secondary border-1 opacity-75" />
              <li>
                <button className="nav-link" onClick={logout}>
                  <i className="bi bi-box-arrow-left" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="floatingButton">
        <button className="coll-btn" type="button" onClick={handleCollapse}>
          <i className="chevron bi bi-chevron-left"></i>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
