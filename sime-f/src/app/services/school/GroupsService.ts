import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { SimeService } from "../SIMEService";


export class GroupsService {

  public static async register(obj: any){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post('/group/register', obj, { Authorization: 'Bearer ' + localStorage.getItem('token')});
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
      resp = await SimeService.post(`/group/edit/${id}`, obj, { Authorization: 'Bearer ' + localStorage.getItem('token')});
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
      resp = await SimeService.delete('/group/delete/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getGroups(){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/group/all', { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getGroup(id: number){
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.get('/group/' + id, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async getGroupsWithSubjectsByUser(userId: number){
    let resp;
    if (!localStorage.getItem('token')) {
      return resp = { data: [], success: false, status: 401, message: 'Token not found' } as ApiResponse;
    } else {
      resp = await SimeService.get(`/group/with-subjects-by-user/${userId}`, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200) {
        return resp.data;
      } else {
        return resp.data;
      }
    }
  }
  
}
