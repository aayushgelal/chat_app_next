export const Host = "http://localhost:4000";
const AUTH_ROUTE = `${Host}/auth`;
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/login`;
export const SIGNUP_USER_ROUTE = `${AUTH_ROUTE}/signup`;
const MESSAGE_ROUTE = `${Host}/chat`;
export const ADD_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/addmessage`;
export const GET_USER_ROUTE = `${AUTH_ROUTE}/getusers`;
