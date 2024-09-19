export interface User{
  id?: number;
  first_name: string;
  maternal_surname: string;
  paternal_surname: string;
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
