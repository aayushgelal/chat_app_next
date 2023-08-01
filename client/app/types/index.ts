import { MouseEventHandler } from "react";

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
interface State {
  user: String | null;
  token: String | null;
  name: String | null;
  email: String | null;
}

export type { State, NavItemProps, MusicGenreProps };
