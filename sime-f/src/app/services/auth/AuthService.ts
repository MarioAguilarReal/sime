import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { SimeService } from "../SIMEService";

export class AuthService{

  public static async login(obj: any):Promise<any>{
      let resp = await SimeService.post('/login', obj);
      console.log(resp);
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

  public static async sendEmailToForgetPassword(email: string|any):Promise<any>{
    // debugger;
    let resp;
    resp = await SimeService.post(`/email/forget-password`, {email});
    if (resp.status === 200){
      return resp.data;
    }else{
      return resp.data;
    }
}

  public static async verifyToken(obj: any):Promise<any>{
    let resp;
    console.log(obj);
    resp = await SimeService.post('/token/verify-forget-password', obj);
    if (resp.status === 200){
      return resp.data;
    }else{
      return resp.data;
    }
  }

  public static async resetPassword(obj: any):Promise<any>{
    let resp;
    resp = await SimeService.post('/reset-password', obj);
    if (resp.status === 200){
      return resp.data;
    }else{
      return resp.data;
    }
  }

  public static async changePassword(obj: any):Promise<any>{
    let resp;
    if(!localStorage.getItem('token')){
      return resp = {data: [], success: false, status: 401, message: 'Token not found'} as ApiResponse;
    }else{
      resp = await SimeService.post('/change-password', obj, { Authorization: 'Bearer ' + localStorage.getItem('token') });
      if (resp.status === 200){
        return resp.data;
      }else{
        return resp.data;
      }
    }
  }


}
