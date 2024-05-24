import { Student } from "../../interfaces/student/Student";
import { SimeService } from "../SIMEService";
import { ApiResponse } from "../../interfaces/response/ApiResponse";

export class StudentService{
    public static async register(obj: FormData):Promise<any>{
        let resp;
        if (!localStorage.getItem('token')){
            return  resp = {data: [], success: false, status: 401, message: "Token not found"} as ApiResponse;
        } else {
            resp = await SimeService.post('/students/register', obj, { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' });
            console.log(resp);
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
    
    public static async update(obj: FormData, id: number):Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        } else {
            resp = await SimeService.post('/students/update/' + id, obj, { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else{
                return resp.data;
            }
        }
    }
    
    public static async delete(id: number):Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        }else{
            resp = await SimeService.delete('/students/delete/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if(resp === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
    
    public static async getStudent(id: number):Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        } else {
            resp = await SimeService.get('/students/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
    
    public static async getAll():Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        } else {
            resp = await SimeService.get('/students/all/', { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
}