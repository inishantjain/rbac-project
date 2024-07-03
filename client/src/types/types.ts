export interface User {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  isAdmin: boolean;
  imgUrl?: string;
}

export type RegisterFormType = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

export type LoginFormType = {
  email: string;
  password: string;
};
