import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import Dashboard from "../views/dashboard/Dashboard";
import UserOverview from "../views/Users/Overview/UserOverview";
import RegisterUser from "../views/Users/Register/RegisterUser";
import UsersTable from "../views/Users/UsersTable/UsersTable";

export const routesConfig: IRoute[] = [
  // Public Routes
  {title: 'login', path: '/auth/login', element: Login, private: false},

  // Private Routes
  {title: 'dashboard', path: '/dashboard', element: Dashboard, private: true},

  {title: 'register-user', path: '/register/user', element: RegisterUser, private: true},
  {title: 'list-users', path: '/list/users', element: UsersTable, private: true},
  {title: 'user-overview', path: '/user/overview/:id', element: UserOverview, private: true},
]
