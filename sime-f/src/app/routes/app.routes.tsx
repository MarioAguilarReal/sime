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
import ChangePassword from "../views/auth/settings/changePassword/ChangePassword";
import Profile from "../views/auth/settings/profile/Profile";
import Groups from "../views/groups/Groups";
import Classes from "../views/clases/Classes";
import StudentAcademicDataRegister from "../views/student/AcademicData/Register/StudentAcademicDataRegister";
import ViewStudentAcademicData from "../views/student/AcademicData/Overview/ViewStudentAcademicData";
import EditStudentAcademicData from "../views/student/AcademicData/Edit/EditStudentAcademicData";
import StudentSpecialNeedsRegister from "../views/student/SpecialNeeds/Register/StudentSpecialNeedsRegister";
import ViewStudentSpecialNeeds from "../views/student/SpecialNeeds/Overview/ViewStudentSpecialNeeds";
import EditStudentSpecialNeeds from "../views/student/SpecialNeeds/Edit/EditStudentSpecialNeeds";
import StudentCognitiveSkillsRegister from "../views/student/CognitiveSkills/Register/StudentCognitiveSkillsRegister";
import ViewStudentCognitiveSkills from "../views/student/CognitiveSkills/Overview/ViewStudentCognitiveSkills";
import EditStudentCognitiveSkills from "../views/student/CognitiveSkills/Edit/EditStudentCognitiveSkills";

export const routesConfig: IRoute[] = [
  // Public Routes
  { title: 'login', path: '/auth/login', element: Login, private: false },
  { title: 'change-password', path: '/auth/change-password/:id', element: ChangePassword, private: false },

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
  { title: 'profile', path: '/auth/profile', element: Profile, private: true },

  { title: 'student-data-register', path: '/student/data/register/:id', element: StudentAcademicDataRegister, private: true },
  { title: 'student-data-overview', path: '/student/data/overview/:id', element: ViewStudentAcademicData, private: true },
  { title: 'student-data-edit', path: '/student/data/edit/:id', element: EditStudentAcademicData, private: true },

  { title: 'student-need-register', path: '/student/need/register/:id', element: StudentSpecialNeedsRegister, private: true },
  { title: 'student-need-overview', path: '/student/need/overview/:id', element: ViewStudentSpecialNeeds, private: true },
  { title: 'student-need-edit', path: '/student/need/edit/:id', element: EditStudentSpecialNeeds, private: true },

  { title: 'student-cognitive-skills-register', path: '/student/cognitive/skills/register/:id', element: StudentCognitiveSkillsRegister, private: true },
  { title: 'student-cognitive-skills-overview', path: '/student/cognitive/skills/overview/:id', element: ViewStudentCognitiveSkills, private: true },
  { title: 'student-cognitive-skills-edit', path: '/student/cognitive/skills/edit/:id', element: EditStudentCognitiveSkills, private: true },

  { title: 'groups', path: '/list/groups', element: Groups, private: true },
  { title: 'classes', path: '/list/classes', element: Classes, private: true },
]
