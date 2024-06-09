import { SimeService } from "../SIMEService";
import { ApiResponse } from "../../interfaces/response/ApiResponse";

export class StudentAlternativeSkillsService{
    public static async register(obj: any, id:number):Promise<any>{
        let resp;
        if (!localStorage.getItem('token')){
            return resp = { data: [], success: false, status:401, message: "Token not found"} as ApiResponse;
        } else {
            resp = await SimeService.post('/students/alternative-skills/register/' + id, obj, {Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data' });
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }

    public static async update(obj: any, id:number):Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        } else {
            resp = await SimeService.post('/students/alternative-skills/update/' + id, obj, { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else{
                return resp.data;
            }
        }
    }

    public static async get(id: number):Promise<any>{
        let resp;
        if(!localStorage.getItem('token')){
            return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
        } else {
            resp = await SimeService.get('/students/alternative-skills/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
            if (resp.status === 200){
                return resp.data;
            } else {
                return resp.data;
            }
        }
    }
}