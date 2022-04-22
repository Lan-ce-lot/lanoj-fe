/**
 * @FileName: antdUser
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/6 14:46
 */
import * as types from "../action-types";
export const userLogin = (isUserLogin:boolean) => {
  return {
    type: types.USER_LOGIN,
    isUserLogin
  };
};
export const setUserToken = (token:string) => {
  return {
    type: types.USER_SET_USER_TOKEN,
    token
  };
};
export const delUserToken = () => {
  return {
    type: types.USER_DEL_USER_TOKEN,
  };
};
