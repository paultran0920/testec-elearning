import { ILogin, IUser } from "../models/models";

export interface PersistentBase {
  accessToken: string;
  fetchUsers: () => Promise<IUser[]>;
  fetchUser: (userName: string) => Promise<IUser>;
  deleteUser: (userName: string) => Promise<void>;
  addUser: (newUser: IUser) => Promise<void>;
  login: (loginInfo: ILogin) => Promise<{ access_token: string }>;
}
