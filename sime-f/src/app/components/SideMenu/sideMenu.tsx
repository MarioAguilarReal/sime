import { useContext, useEffect } from "react";
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
    }
    setLoading(false);
  };

  useEffect(() => { }, []);

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
        title: "Usuario",
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
        title: "Agregar",
        icon: "bi bi-plus",
        link: "/manage/student",
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
        title: "Materias",
        icon: "bi bi-book",
        link: "/list/classes/",
        visible: user.role === Roles.ADMIN || user.role === Roles.TEACHER,
        division: false,
      },
    ];
  };

  return (
    <div className="side">
      <div className="menu">
        <div className="sideMenu d-flex flex-column flex-shrink-0 slide-menu">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none logo"
          >
            <img src="/sime/assets/images/Site_logo.png" />
          </Link>
          <hr className="border border-1 opacity-75" />
          <ul className="nav nav-pills flex-column mb-auto">
            {getMenuItems().map((item, index) =>
              item.visible ? (
                <li className="nav-item" key={index}>
                  <Link
                    to={item.link}
                    className={`nav-link link-light ${location.pathname === item.link ? "active" : ""
                      }`}
                  >
                    <i className={item.icon} />
                    <p className="item-name">{item.title}</p>
                  </Link>
                  {item.division ? (
                    <hr className="border border-1 opacity-75" />
                  ) : null}
                </li>
              ) : null
            )}
          </ul>
          <hr className="border border-1 opacity-75" />
          <div className="dropdown">
            <a
              href="#"
              className=" profile-button d-flex align-items-center link-light text-decoration-none dropdown-toggle"
              id="dropdownUser2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={
                  user.photo ? user.photo : "/assets/images/default-user.jpg"
                }
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{"Hola! " + user.first_name}</strong>
            </a>
            <ul
              className="dropdown-menu text-small shadow p-3"
              aria-labelledby="dropdownUser2"
            >
              <li>
                {/* Todo - create user profile page and here the link */}
                <Link to={"/auth/profile/"} className="nav-link">
                  <i className="bi bi-person" />
                  &nbsp;
                  Ver Perfil
                </Link>
              </li>
              <hr className="border border-secondary border-1 opacity-75" />
              <li>
                <button className="nav-link" onClick={logout}>
                  <i className="bi bi-box-arrow-left" />
                  &nbsp;
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
