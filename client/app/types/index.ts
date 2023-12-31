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
  avatar: string;
}

interface MessageType {
  // Define the properties of a message, e.g., text, sender, timestamp
  message: string;
  from: string;
  to: string;
  delivered?: string;
  timestamp?: Date;
  imageurl?: string;
  status: string;
}

export type {
  MessageType,
  AuthState,
  userState,
  NavItemProps,
  MusicGenreProps,
};
