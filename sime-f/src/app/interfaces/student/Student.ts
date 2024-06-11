export interface Student{
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
    tutor_name: string;
    tutor_phone: string;
    tutor_age: number;
    tutor_address: string;
    tutor_email: string;
    comments_id?: number;
    student_cognitive_skills_id?: number;
    student_alternative_skills_id?: number;
    student_academic_data_id?: number;
    student_learning_type_id?: number;
    student_special_needs_id?: number;
    student_social_skills_id?: number;
    student_planning_skills_id?: number;
}