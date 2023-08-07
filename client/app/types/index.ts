import { MouseEventHandler } from "react";
import { Interface } from "readline";

interface NavItemProps {
  name?: String;
  link: String;
  icon?: React.FC<any>;
  size?: any;
  onClick?: MouseEventHandler;
}

interface MusicGenreProps {
  name?: String;
  link: String;
  color: string;
}
interface AuthState {
  user: String | null;
  token: String | null;
  name: String | null;
  email: String | null;
}
interface userState {
  id: number;
  name: String;
  email: string;
}
interface UsersState {
  map(arg0: (user: any) => import("react").JSX.Element): any;
  letter: userState[];
}
interface MessageType {
  // Define the properties of a message, e.g., text, sender, timestamp
  message: string;
  from: string;
  to: string;
}

export type {
  MessageType,
  AuthState,
  userState,
  UsersState,
  NavItemProps,
  MusicGenreProps,
};
