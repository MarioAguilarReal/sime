export interface Student{
    //Student
    id?: number;
    first_name: string;
    last_name: string;
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
    //More
    comments_id?: number;
    student_cognitive_skills_id?: number;
    student_alternative_skills_id?: number;
    student_academic_data_id?: number;
    student_learning_type_id?: number;
    student_special_needs_id?: number;
    student_social_skills_id?: number;
    student_planning_skills_id?: number;
}