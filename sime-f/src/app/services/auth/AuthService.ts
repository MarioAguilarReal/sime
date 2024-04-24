import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { SimeService } from "../SIMEService";

export class AuthService{

  public static async login(obj: any):Promise<any>{
      let resp = await SimeService.post('/login', obj);
      if(resp.status === 200){
        localStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      }
      return resp.data;
  }

  public static async logout():Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;

    } else {
      resp = await SimeService.post('/logout', {}, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        localStorage.removeItem('token');
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }

  public static async me():Promise<any>{
    let resp: ApiResponse;

    if(!localStorage.getItem('token')){
      resp = {data: [], success: false, status: 401, message: 'Unauthorized'};
    } else {
      try {
        resp = await SimeService.get('/me', { Authorization: 'Bearer ' + localStorage.getItem('token') });
      } catch (error) {
        resp = { data: [], success: false, status: 401, message: 'Unauthorized'};
      }
    }
    return resp.data;
  }
}
