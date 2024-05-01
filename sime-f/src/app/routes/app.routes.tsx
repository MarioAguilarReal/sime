import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import StudentRegister from "../views/student/StudentRegister";
import Dashboard from "../views/dashboard/Dashboard";
import StudentAll from "../views/student/StudentAll";
import RegisterUser from "../views/Users/Register/RegisterUser";
import UsersTable from "../views/Users/UsersTable/UsersTable";
import UserOverview from "../views/Users/Overview/UserOverview";
import EditUser from "../views/Users/Edit/EditUser";
import ChangePassword from "../views/auth/settings/changePassword/ChangePassword";
import Profile from "../views/auth/settings/profile/Profile";

export const routesConfig: IRoute[] = [
  // Public Routes
  {title: 'login', path: '/auth/login', element: Login, private: false},
  {title: 'change-password', path: '/auth/change-password/:id', element: ChangePassword, private: false},

  // Private Routes

  {title: 'profile', path: '/auth/profile', element: Profile, private: true},

  {title: 'dashboard', path: '/dashboard', element: Dashboard, private: true},

  {title: 'register-user', path: '/register/user', element: RegisterUser, private: true},
  {title: 'edit-user', path: '/edit/user/:id', element: EditUser, private: true},
  {title: 'list-users', path: '/list/users', element: UsersTable, private: true},
  {title: 'user-overview', path: '/user/overview/:id', element: UserOverview, private: true},

  {title: "student_register", path: "/register/student", element: StudentRegister, private: true},
  {title: 'student_all', path: "/list/students", element: StudentAll, private: true},
]
