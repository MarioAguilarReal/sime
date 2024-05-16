import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../environment/environment";

export class SimeService{
  static baseURL = environment.baseURL;

  public static post(path: string, obj:any, headers?: AxiosRequestConfig['headers']): Promise<any> {
    let resp = axios.post(this.baseURL + path, obj, { headers })
    return resp;
  }

  public static get(path: string, headers?: AxiosRequestConfig['headers']): Promise<any> {
    return axios.get(this.baseURL + path, { headers })
  }

  public static put(path: string, obj:any, headers?: AxiosRequestConfig['headers']): Promise<any> {
    return axios.put(this.baseURL + path, obj, { headers })
  }

  public static delete(path: string, headers?: AxiosRequestConfig['headers']): Promise<any> {
    return axios.delete(this.baseURL + path, { headers })
  }

  public static patch(path: string, obj:any, headers?: AxiosRequestConfig['headers']): Promise<any> {
    return axios.patch(this.baseURL + path, obj, { headers })
  }
}
