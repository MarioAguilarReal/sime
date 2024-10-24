import { IRoute } from "../interfaces/IRoute";
import Login from "../views/auth/login/Login";
import Dashboard from "../views/dashboard/Dashboard";
import StudentsAll from "../views/student/List/StudentsAll";
import FormUser from "../views/Users/Form/FormUser";
import UsersTable from "../views/Users/UsersTable/UsersTable";
import UserOverview from "../views/Users/Overview/UserOverview";
import ViewStudent from "../views/student/Overview/ViewStudent";
import ChangePassword from "../views/auth/settings/changePassword/ChangePassword";
import Profile from "../views/auth/settings/profile/Profile";
import Groups from "../views/groups/Groups";
import Classes from "../views/clases/Classes";
import ViewStudentAcademicData from "../views/student/AcademicData/ViewStudentAcademicData";
import ViewStudentSpecialNeeds from "../views/student/SpecialNeeds/ViewStudentSpecialNeeds";
import ViewStudentCognitiveSkills from "../views/student/CognitiveSkills/Overview/ViewStudentCognitiveSkills";
import CognitiveSkillsManagement from "../views/student/CognitiveSkills/Management/CognitiveSkillsManagement";
import ViewStudentSocialSkills from "../views/student/SocialSkills/Overview/ViewStudentSocialSkills";
import ViewStudentAlternativeSkills from "../views/student/AlternativeSkills/Overview/ViewStudentAlternativeSkills";
import ViewStudentPlanningSkills from "../views/student/PlanningSkills/ViewStudentPlanningSkills";
import ViewStudentComments from "../views/student/Comments/ViewStudentComments";
import SepForm from "../views/form/sepForm";
import ForgetPassword from "../views/auth/settings/forgetPassword/ForgetPassword";
import OverviewGroup from "../views/groups/OverviewGroup";
import StudentManagement from "../views/student/Management/StudentManagement";
import SocialSkillsManagement from "../views/student/SocialSkills/Management/SocialSkillsManagement";
import AlternativeSkillsManagement from "../views/student/AlternativeSkills/Management/AlternativeSkillsManagement";

export const routesConfig: IRoute[] = [
  // Public Routes
  { title: 'login', path: '/auth/login', element: Login, private: false },
  { title: 'change-password', path: '/auth/change-password/:id', element: ChangePassword, private: false },

  { title: 'sepForm', path: '/forms/sep-test', element: SepForm, private: false },

  // Private Routes
  { title: 'dashboard', path: '/dashboard', element: Dashboard, private: true },

  // Users
  { title: 'register-user', path: '/register/user', element: FormUser, private: true },
  { title: 'edit-user', path: '/edit/user/:id', element: FormUser, private: true },
  { title: 'list-users', path: '/list/users', element: UsersTable, private: true },
  { title: 'user-overview', path: '/user/overview/:id', element: UserOverview, private: true },

  // Auth
  { title: 'profile', path: '/auth/profile', element: Profile, private: true },
  { title: 'edit-profile', path: '/auth/edit-profile/:id', element:FormUser, private: true },
  { title: 'change-password', path: '/auth/change-password/:id', element: ChangePassword, private: true },
  { title: 'forget-password', path: '/auth/forget-password', element: ForgetPassword, private: false },

  // Students
  { title: 'list-students', path: '/list/students', element: StudentsAll, private: true },
  { title: 'student-overview', path: "/student/overview/:id", element: ViewStudent, private: true },
  { title: 'student-manage', path: '/manage/student', element: StudentManagement, private: true },
  { title: 'student-manage', path: '/manage/student/:id', element: StudentManagement, private: true },

  { title: 'student-data-overview', path: '/student/data/overview/:id', element: ViewStudentAcademicData, private: true },

  { title: 'student-need-overview', path: '/student/need/overview/:id', element: ViewStudentSpecialNeeds, private: true },

  { title: 'student-cognitive-skills-overview', path: '/student/cognitive/skills/overview/:id', element: ViewStudentCognitiveSkills, private: true },
  { title: 'student-cognitive-skills-manage', path: '/student/cognitive/skills/management/:id', element: CognitiveSkillsManagement, private: true },

  { title: 'student-social-skills-overview', path: '/student/social/skills/overview/:id', element: ViewStudentSocialSkills, private: true },
  { title: 'student-social-skills-manage', path: '/student/social/skills/management/:id', element: SocialSkillsManagement, private: true },

  { title: 'student-alternative-skills-overview', path: '/student/alternative/skills/overview/:id', element: ViewStudentAlternativeSkills, private: true },
  { title: 'student-alternative-skills-manage', path: '/student/alternative/skills/management/:id', element: AlternativeSkillsManagement, private: true },

  { title: 'student-plnning-skills-overview', path: '/student/planning/skills/overview/:id', element: ViewStudentPlanningSkills, private: true },

  { title: 'student-comments', path: '/student/comments/:id', element: ViewStudentComments, private: true },


  // Groups
  { title: 'groups', path: '/list/groups', element: Groups, private: true },
  { title: 'group', path: 'group/overview/:id', element: OverviewGroup, private: true },

  // Classes
  { title: 'classes', path: '/list/classes', element: Classes, private: true },
]
