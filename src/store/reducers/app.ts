import * as types from "../action-types";
import {AnyAction} from 'redux'
import Cookies from 'js-cookie'

const initState = {
  sidebarCollapsed: Cookies.get('sidebarCollapsed') || false,
  loading: true,
};
export default function app(state = initState, action: AnyAction) {
  switch (action.type) {
    case types.APP_TOGGLE_SIDEBAR:
      Cookies.set('sidebarCollapsed', action.sidebarCollapsed)
      return {
        ...state,
        sidebarCollapsed: action.sidebarCollapsed,
      };
    case types.APP_CHANGE_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}
