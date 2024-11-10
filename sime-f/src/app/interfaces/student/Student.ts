import { StudentAcademicData } from "./StudentAcademicData";
import { StudentComments } from "./StudentComments";
import { StudentSpecialNeeds } from "./StudentSpecialNeeds";
import { StudentSocialSkills } from "./StudentSocialSkills";
import { StudentCognitiveSkills } from "./StudentCognitiveSkills";
import { StudentPlanningSkills } from "./StudentPlanningSkills";
import { StudentAlternativeSkills } from "./StudentAlternativeSkills";

export interface Student{
    //Student
    id?: number;
    first_name: string;
    maternal_surname: string;
    paternal_surname: string;
    photo?: string;
    birth_date: Date;
    gender: number;
    address: string;
    trans_type: number;
    age: number;
    civil_status: number;
    birth_place: string;
    nationality: string;
    curp: string;
    transport_time: string;
    //Tutor
    tutor_name: string;
    tutor_phone: string;
    tutor_age: number;
    tutor_address: string;
    tutor_email: string;
    tutor_birth_date: Date;
    tutor_occupation: string;
    tutor_schooling: string;
    tutor_live_student: number;
    tutor_curp: string;
    //Emergency Contact
    emergency_contact_name_1: string;
    emergency_contact_phone_1: string;
    emergency_contact_relationship_1: string;
    emergency_contact_name_2: string;
    emergency_contact_phone_2: string;
    emergency_contact_relationship_2: string;
    //More Info
    student_academic_data?: StudentAcademicData
    alternative_skills?: StudentAlternativeSkills;
    cognitive_skills?: StudentCognitiveSkills;
    comments: StudentComments;
    planning_skills?: StudentPlanningSkills;
    social_skills?: StudentSocialSkills;
    special_needs?: StudentSpecialNeeds;
    learningType?: LearningType;
}

interface LearningType{
    id?: number;
    name?: string;
}
