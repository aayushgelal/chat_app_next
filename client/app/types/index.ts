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
  user: string | null;
  token: string | null;
  name: string | null;
  email: string | null;
}
interface userState {
  id: number;
  name: string;
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
  delivered?: string;
  timestamp?: Date;
  imageurl?: string;
}

export type {
  MessageType,
  AuthState,
  userState,
  UsersState,
  NavItemProps,
  MusicGenreProps,
};
