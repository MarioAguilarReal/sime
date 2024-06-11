export interface User{
  id?: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  age: number;
  gender:number;
  photo?: string;
  address: string;
  phone: string;
  civil_status: number;
  role: number;
  email: string;
  password?: string;
  confirm_password?: string;

  classes?: any[];
  groups?: any[];
}
