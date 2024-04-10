import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './sideMenu.scss';

const SideMenu = () =>{

  const logout = () => {
    console.log("logout");
  }

  useEffect(() => {

  }, []);

  return(
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
          <Link to={"users"} className="nav-link link-light">
            <i className="fa fa-user" />
            &nbsp; Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"new-user"} className="nav-link link-light">
            <i className="fa fa-user" />
            &nbsp; New User
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"properties"} className="nav-link link-light">
            <i className="fa fa-home" />
            &nbsp; Properties
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"dashboard"} className="nav-link link-light">
            <i className="fa fa-home" />
            &nbsp; New Property
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
          <img


            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <Link to={"/"} className="nav-link">Back to Home</Link>
          </li>
          <li>
            <button className="nav-link" onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu;
