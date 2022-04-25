/**
 * @FileName: commonMenuList
 * @Description: Every Saint has a past, every sinner has a future.
 * @Author: Lance
 * @Date: 2022/4/23 2:10
 */
import React from "react";
import {MenuObject} from "./adminMenuList";

//import styles from './commonMenuList.module.scss'

interface IProps {

}

interface IState {

}


export const commonMenuList: MenuObject[] = [
  {
    title: "首页",
    icon: "home",
    path: "/home",
    name: "首页",
    roles: ["*"],
  },
  {
    title: "题库",
    icon: "appstore",
    path: "/problems",
    name: "题库",
    roles: ["*"],
  },
  {
    title: "班级",
    icon: "team",
    path: "/class",
    name: "班级",
    roles: ["*"],
  },
  {
    title: "比赛",
    icon: "trophy",
    path: "/contest",
    name: "比赛",
    roles: ["*"],
  },
  {
    title: "状态",
    icon: "stock",
    path: "/status",
    name: "状态",
    roles: ["*", "Root", "Admin", "Teacher", "Common"],
  },
  {
    title: "题解",
    icon: "read",
    path: "/article",
    name: "题解",
    roles: ["*"],
  },
]
