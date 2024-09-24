import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { User } from "../../interfaces/user/User";
import { SimeService } from "../SIMEService";

export class UsersService {

  public static async register(obj: FormData):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post('/user/register', obj, { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'});
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }

  }

  public static async update(obj: FormData, id: number):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post(`/user/edit/${id}`, obj, { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data'});
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async delete(id: number):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      console.log('delete user id: ', id)
      resp = await SimeService.delete('/user/delete/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }


  public static async getUsers():Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/user/all/', { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getUser(id: number):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/user/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getUserClasses(id: any):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/user/classes/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getUserGroups(id: any):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/user/groups/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

}

