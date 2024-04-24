import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import StudentRegister from "../views/student/StudentRegister";
import Dashboard from "../views/dashboard/Dashboard";
import StudentAll from "../views/student/StudentAll";
import RegisterUser from "../views/Users/Register/RegisterUser";
import UsersTable from "../views/Users/UsersTable/UsersTable";
import UserOverview from "../views/Users/Overview/UserOverview";

export const routesConfig: IRoute[] = [
  // Public Routes
  {title: 'login', path: '/auth/login', element: Login, private: false},

  // Private Routes

  {title: "student_register", path: "/register/student", element: StudentRegister, private: true},

  {title: 'student_all', path: "/all/student", element: StudentAll, private: true},

  {title: 'dashboard', path: '/dashboard', element: Dashboard, private: true},

  {title: 'register-user', path: '/register/user', element: RegisterUser, private: true},
  {title: 'list-users', path: '/list/users', element: UsersTable, private: true},
  {title: 'user-overview', path: '/user/overview/:id', element: UserOverview, private: true},
]
