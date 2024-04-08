import { ApiResponse } from "../../interfaces/response/ApiResponse";
import { User } from "../../interfaces/user/User";
import { SimeService } from "../SIMEService";

export class AuthService{

  public static async login(obj: User):Promise<any>{
      let resp = await SimeService.post('/login', obj);
      if(resp.status === 200){
        localStorage.setItem('token', resp.data.token);
        sessionStorage.setItem('user', JSON.stringify(resp.data.user));
      }
      return resp.data;
  }

  public static async register(obj: User):Promise<ApiResponse>{

    return (await SimeService.post('/register', obj)).data;

  }

  public static async logout():Promise<ApiResponse>{
    let resp: ApiResponse; // Initialize resp with an empty object of type ApiResponse

    if(!localStorage.getItem('token')){
      resp = {data: [], success: false, status: 401, message: 'Unauthorized'};
    } else {
      try {
        resp = await SimeService.post('/logout', {}, { Authorization: 'Bearer ' + localStorage.getItem('token') });
        localStorage.removeItem('token');
      } catch (error) {
        resp = { data: [], success: false, status: 401, message: 'Unauthorized'};
      }
    }
    return resp;
  }

  public static async me():Promise<ApiResponse>{
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
    return resp;
  }
}
