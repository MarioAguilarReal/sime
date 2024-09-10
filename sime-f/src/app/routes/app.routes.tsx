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
import StudentSocialSkillsRegister from "../views/student/SocialSkills/Register/StudentSocialSkillsRegister";
import ViewStudentSocialSkills from "../views/student/SocialSkills/Overview/ViewStudentSocialSkills";
import EditStudentSocialSkills from "../views/student/SocialSkills/Edit/EditStudentSocialSkills";
import StudentAlternativeSkillsRegister from "../views/student/AlternativeSkills/Register/StudentAlternativeSkillsRegister";
import ViewStudentAlternativeSkills from "../views/student/AlternativeSkills/Overview/ViewStudentAlternativeSkills";
import EditStudentAlternativeSkills from "../views/student/AlternativeSkills/Edit/EditStudentAlternativeSkills";
import StudentPlanningSkillsRegister from "../views/student/PlanningSkills/Register/StudentPlanningSkillsRegister";
import ViewStudentPlanningSkills from "../views/student/PlanningSkills/Overview/ViewStudentPlanningSkills";
import EditStudentPlanningSkills from "../views/student/PlanningSkills/Edit/EditStudentPlanningSkills";
import ViewStudentComments from "../views/student/Comments/ViewStudentComments";
import SepForm from "../views/form/sepForm";

export const routesConfig: IRoute[] = [
  // Public Routes
  { title: 'login', path: '/auth/login', element: Login, private: false },
  { title: 'change-password', path: '/auth/change-password/:id', element: ChangePassword, private: false },

  { title: 'sepForm', path: '/forms/sep-test', element: SepForm, private: false },

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

  { title: 'student-social-skills-register', path: '/student/social/skills/register/:id', element: StudentSocialSkillsRegister, private: true },
  { title: 'student-social-skills-overview', path: '/student/social/skills/overview/:id', element: ViewStudentSocialSkills, private: true },
  { title: 'student-social-skills-edit', path: '/student/social/skills/edit/:id', element: EditStudentSocialSkills, private: true },

  { title: 'student-alternative-skills-register', path: '/student/alternative/skills/register/:id', element: StudentAlternativeSkillsRegister, private: true },
  { title: 'student-alternative-skills-overview', path: '/student/alternative/skills/overview/:id', element: ViewStudentAlternativeSkills, private: true },
  { title: 'student-alternative-skills-edit', path: '/student/alternative/skills/edit/:id', element: EditStudentAlternativeSkills, private: true },

  { title: 'student-plnning-skills-register', path: '/student/planning/skills/register/:id', element: StudentPlanningSkillsRegister, private: true },
  { title: 'student-plnning-skills-overview', path: '/student/planning/skills/overview/:id', element: ViewStudentPlanningSkills, private: true },
  { title: 'student-plnning-skills-edit', path: '/student/plnning/skills/edit/:id', element: EditStudentPlanningSkills, private: true },

  { title: 'student-comments', path: '/student/comments/:id', element: ViewStudentComments, private: true },

  { title: 'groups', path: '/list/groups', element: Groups, private: true },
  { title: 'classes', path: '/list/classes', element: Classes, private: true },
]
