export interface IUser {
  userName: string; // PK
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  userRole: UserRoles;
}

export interface ILogin {
  username: string;
  password: string;
}

export enum UserRoles {
  Admin = "admin",
  Mentor = "mentor",
  Student = "student"
}
