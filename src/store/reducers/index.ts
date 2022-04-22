/**
 * @FileName: index
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/2/26 14:38
 */
import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
// import settings from "./settings";
// import tagsView from "./tagsView";
// import monitor from "./monitor";

export default combineReducers({
  user,
  app,
  // settings,
  // tagsView,
  // monitor
});
