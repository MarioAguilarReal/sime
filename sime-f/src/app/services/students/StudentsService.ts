import { Student } from "../../interfaces/student/Student";
import { SimeService } from "../SIMEService";

export class StudentService{
    public static async register(obj: Student):Promise<any>{
        return obj;
    }
    
    public static async update(obj: Student):Promise<any>{
        return obj;
    }
    
    public static async delete(id: number):Promise<any>{
        return id;
    }
    
    public static async getStudent(id: number):Promise<any>{

        return id;
    }
    
    public static async getAll():Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'};
        } else {
            resp = await SimeService.get('/students/all', { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
}