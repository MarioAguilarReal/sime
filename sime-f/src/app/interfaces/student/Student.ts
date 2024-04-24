export interface Student{
    id?: number;
    first_name: string;
    last_name: string;
    photo: string;
    birth_date: Date;
    gender: string;
    address: string;
    trans_type: string;
    age: number;
    civil_status: string;
    tutor_name: string;
    tutor_phone: string;
    tutor_age: number;
    tutor_address: string;
    tutor_email: string;
    cognitive_skills?: string;
    alternative_skills?: string;
    student_academic_data?: number;
    learning_type?: number;
    special_needs?: number;
    social_skills?: number;
    planning_skills?: number;
}