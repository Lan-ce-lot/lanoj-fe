import * as types from "../action-types";
import Cookies from "js-cookie";
import loading from "../../components/Loading";
export const toggleSiderBar = (sidebarCollapsed:boolean) => {
  return {
    type: types.APP_TOGGLE_SIDEBAR,
    sidebarCollapsed
  };
};

export const changeLoading = (loading:boolean) => {
  return {
    type: types.APP_CHANGE_LOADING,
    loading
  }
}
