export const Host = "http://localhost:4000";
const AUTH_ROUTE = `${Host}/auth`;
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/login`;
export const SIGNUP_USER_ROUTE = `${AUTH_ROUTE}/signup`;
const MESSAGE_ROUTE = `${Host}/chat`;
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/getmessage`;
export const GET_USER_ROUTE = `${AUTH_ROUTE}/getusers`;
export const ADD_IMAGE_ROUTE = `${MESSAGE_ROUTE}/addfilemessage`;
