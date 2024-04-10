import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import AdminRegister from "../views/auth/register/admin/AdminRegister";
import ScholarGroupRegister from "../views/auth/register/scholarGroups/ScholarGroupRegister";
import StudentRegister from "../views/auth/register/student/StudentRegister";
import TeacherRegister from "../views/auth/register/teacher/TeacherRegister";
import Dashboard from "../views/dashboard/Dashboard";

export const routesConfig: IRoute[] = [
  // Public Routes
  {title: 'login', path: '/auth/login', element: Login, private: false},
  {title: 'admin_register', path: '/auth/register/admin', element: AdminRegister, private: false},

  // Private Routes

  {title: 'teacher_register', path: '/auth/register/teacher', element: TeacherRegister, private: true},
  {title: "student_register", path: "/auth/register/student", element: StudentRegister, private: true},
  {title: 'group_register', path: '/auth/register/group', element: ScholarGroupRegister, private: true},

  {title: 'dashboard', path: '/dashboard', element: Dashboard, private: true},
]
