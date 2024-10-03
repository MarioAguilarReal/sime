import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { SimeService } from "../SIMEService";


export class ClassesService {

  public static async register(obj: any):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post('/class/register', obj, { Authorization: 'Bearer ' + localStorage.getItem('token')});
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async update(obj: any, id: number){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post(`/class/edit/${id}`, obj, { Authorization: 'Bearer ' + localStorage.getItem('token')});
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async delete(id: number){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      console.log('delete class id: ', id)
      resp = await SimeService.delete('/class/delete/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getClasses(){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/class/all', { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getClassesBySchoolId(schoolId: number){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get(`/class/school/${schoolId}`, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }
}
