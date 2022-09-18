import React, { createContext, Dispatch } from "react";
import { IUser } from "../models/models";

export const defaultContext = {
  users: [],
};

export interface ContextDataType {
  users: IUser[];
  message?: string;
  error?: string;
  currentUser?: IUser;
};

export interface ContextType {
  contextData: ContextDataType;
  setContextData: Dispatch<React.SetStateAction<ContextDataType>>
};

export const AppContext = createContext<ContextType>({
  contextData: defaultContext,
  setContextData: () => {}
});
