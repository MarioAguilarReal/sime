import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import Dashboard from "../views/dashboard/Dashboard";

export const routesConfig: IRoute[] = [
  // Public Routes
  {title: 'login', path: '/auth/login', element: Login, private: false},

  // Private Routes

  {title: 'dashboard', path: '/dashboard', element: Dashboard, private: true},
]
