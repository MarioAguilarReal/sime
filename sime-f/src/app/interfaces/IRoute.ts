export interface IRoute {
  title: string;
  path: string;
  element: React.ReactNode | any;
  private?: boolean;
  exact?: boolean;
}
