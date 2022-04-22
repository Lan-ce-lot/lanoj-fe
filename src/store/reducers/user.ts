/**
 * @FileName: antdUser
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/3/6 14:47
 */
import * as types from "../action-types";
import {AnyAction} from 'redux'
import Cookies from "js-cookie";
import {parseToken} from "../../utils/jwt";

const initState = {
  isUserLogin: Cookies.get('isUserLogin') || false,
  token: Cookies.get('token'),
  id: Cookies.get('id') || (Cookies.get('token') ? parseToken(Cookies.get('token')!).id : null),
  role: Cookies.get('role') || (Cookies.get('token') ? parseToken(Cookies.get('token')!).role : null)
};
export default function user(state = initState, action: AnyAction) {
  switch (action.type) {
    case types.USER_LOGIN:
      Cookies.set('isUserLogin', action.isUserLogin)
      return {
        ...state,
        isUserLogin: action.isUserLogin,
      };
    case types.USER_SET_USER_TOKEN:
      Cookies.set('token', action.token)
      Cookies.set('id', parseToken(Cookies.get('token')!).userId)
      // console.log(parseToken(Cookies.get('token')!).userId)
      Cookies.set('role', parseToken(Cookies.get('token')!).role)
      return {
        ...state,
        token: action.token,
        role: parseToken(Cookies.get('token')!).role,
        id: parseToken(Cookies.get('token')!).userId,
      }
    case types.USER_DEL_USER_TOKEN:
      Cookies.remove('token')
      Cookies.remove('id')
      Cookies.remove('role')
      return {
        ...state,
        token: null,
        role: null,
        id: null
      }
    default:
      return state;
  }
}
