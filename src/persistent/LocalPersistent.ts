import { ILogin, IUser, UserRoles } from "../models/models";
import { PersistentBase } from "./PersistentBase";
import { logDebug } from "../logs/logger";

let users: IUser[] = [
  {
    firstName: "Paul",
    lastName: "Tran",
    userName: "admin",
    phone: "123456789",
    email: "paul.tran.0920@gmail.com",
    userRole: UserRoles.Admin,
  },
  {
    firstName: "Student",
    lastName: "1",
    userName: "student1",
    phone: "123456789",
    email: "student.1.0920@gmail.com",
    userRole: UserRoles.Student,
  },
  {
    firstName: "Mentor",
    lastName: "1",
    userName: "mentor1",
    phone: "123456789",
    email: "mentor.2.0920@gmail.com",
    userRole: UserRoles.Mentor,
  },
];

export class LocalPersistent implements PersistentBase {
  private token!: string;

  constructor() {
    logDebug("Init LocalPersistent");
  }

  set accessToken(accessToken: string) {
    this.token = accessToken;
  }

  get accessToken() {
    if (!this.token) {
      throw new Error("Not yet login!");
    }
    return this.token;
  }

  async fetchUsers() {
    return users;
  }

  async fetchUser(userName: string) {
    return users[1];
  }

  async deleteUser(userName: string) {
    users = users.filter((user) => user.userName !== userName);
  }

  async addUser(newUser: IUser) {
    if (!users.find((user) => user.userName === newUser.userName)) {
      users.push(newUser);
      return;
    }
    throw new Error(`The user with user name ${newUser.userName} existed!`);
  }

  async login(loginInfo: ILogin) {
    return { access_token: `a token for ${loginInfo.username}` };
  }
}
