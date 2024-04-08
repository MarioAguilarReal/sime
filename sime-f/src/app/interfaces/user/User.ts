export interface User{
  name?: string;
  email: string;
  password: string;
  is_admin?: boolean;
  repeatPassword?: string;
}
