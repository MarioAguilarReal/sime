export interface Classe {
    id?: number;
    name: string;
    description: string;
    user_id: string;
    max_students?: number;
    status?: boolean;
    subject_id?: number[];
}
