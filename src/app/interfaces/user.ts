export interface User {
  email: string;
  active?: boolean;
  id?: number;
  name?: string;
  surname?: string;
  password?: string;
  subscription?: string;
  premium_remain?: number;
  buyedArticles?: string;
}