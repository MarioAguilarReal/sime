import { Classe } from "./Classe";

export interface Group{
    id?: number;
    grade: number;
    group: number;
    user_id: string;
    comments?: string;
    subjects?: Classe[];
}
