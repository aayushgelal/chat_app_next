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

export type { AuthState, userState, UsersState, NavItemProps, MusicGenreProps };
