import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import StudentRegister from "../views/student/Register/StudentRegister";
import Dashboard from "../views/dashboard/Dashboard";
import StudentsAll from "../views/student/List/StudentsAll";
import RegisterUser from "../views/Users/Register/RegisterUser";
import UsersTable from "../views/Users/UsersTable/UsersTable";
import UserOverview from "../views/Users/Overview/UserOverview";
import ViewStudent from "../views/student/Overview/ViewStudent";
import EditStudent from "../views/student/Edit/EditStudent";
import EditUser from "../views/Users/Edit/EditUser";

export const routesConfig: IRoute[] = [
  // Public Routes
  { title: 'login', path: '/auth/login', element: Login, private: false },

  // Private Routes
  { title: 'dashboard', path: '/dashboard', element: Dashboard, private: true },

  { title: 'register-user', path: '/register/user', element: RegisterUser, private: true },
  { title: 'edit-user', path: '/edit/user/:id', element: EditUser, private: true },
  { title: 'list-users', path: '/list/users', element: UsersTable, private: true },
  { title: 'user-overview', path: '/user/overview/:id', element: UserOverview, private: true },

  { title: 'student-register', path: '/register/student', element: StudentRegister, private: true },
  { title: 'list-students', path: '/list/students', element: StudentsAll, private: true },
  { title: 'student-overview', path: "/student/overview/:id", element: ViewStudent, private: true },
  { title: 'student-edit', path: '/edit/student/:id', element: EditStudent, private: true },
]
