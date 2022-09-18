import { logDebug, logError } from "../logs/logger";
import { ILogin, IUser } from "../models/models";
import { PersistentBase } from "./PersistentBase";

const BE_ROOT = process.env.REACT_APP_BE_ROOT;

export class ProPersistent implements PersistentBase {
  private token!: string;

  constructor() {
    logDebug('Init ProPersistent');
  }

  set accessToken(accessToken: string) {
    this.token = accessToken;
  }

  get accessToken() {
    if (!this.token) {
      throw new Error('Not yet login!');
    }
    return this.token;
  }

  async fetchUsers(): Promise<IUser[]>{
    const result = await fetch(`${BE_ROOT}/users`, {
      method: 'GET',
      headers: this.genDefaultHeaders(),
    });
    
    return await this.processFetchResult(result);
  }

  async fetchUser(userName: string) {
    const result = await fetch(`${BE_ROOT}/users/${userName}`, {
      method: 'GET',
      headers: this.genDefaultHeaders(),
    });
    
    return await this.processFetchResult(result);
  }

  async deleteUser(userName: string) {
    const result = await fetch(`${BE_ROOT}/users/${userName}`, {
      method: 'DELETE',
      headers: this.genDefaultHeaders(),
    });

    return await this.processFetchResult(result);
  }

  async addUser(newUser: IUser) {
    const result = await fetch(`${BE_ROOT}/users`, {
      method: 'POST',
      headers: this.genDefaultHeaders(),
      body: JSON.stringify(newUser),
    });

    return await this.processFetchResult(result);
  }

  async login(loginInfo: ILogin) {
    const result = await fetch(`${BE_ROOT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    return await this.processFetchResult(result);
  }

  private genDefaultHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    }

    return headers;
  }

  private async processFetchResult(result: any) {
    if (!result.ok) {
      const err = JSON.parse(await result.text());
      logError(err);
      throw new Error(err.message);
    } else {
      return result.json();
    }
  }
}
